import csv
import os
import glob

def process_athlete_data(file_path):

   # Extracting athlete stats by year
   records = []

   # Extracting athlete races
   races = []           

   athlete_name = ""
   athlete_id = ""
   comments = ""

   with open(file_path, newline='', encoding='utf-8') as file:
      reader = csv.reader(file)
      data = list(reader)

      athlete_name = data[0][0]
      athlete_id = data[1][0]
      print(f"The athlete id for {athlete_name} is {athlete_id}")

      for row in data[5:-1]:
         if row[2]:
            records.append({"year": row[2], "sr": row[3]})
         else:
            races.append({
               "finish": row[1],
               "time": row[3],
               "meet": row[5],
               "url": row[6],
               "comments": row[7]
            })

   return {
      "name": athlete_name,
      "athlete_id": athlete_id,
      "season_records": records,
      "race_results": races,
      "comments": comments
   }    

def generate_nav_links(team, athlete_files):
    nav_links = ""
    for file in athlete_files:
        athlete_name = file.split('.')[0]  # Remove the .csv extension for display
        athlete_page = f'<li><a href="../{team}/{file.replace(".csv", ".html")}">{athlete_name}</a></li>'
        nav_links += athlete_page
    return nav_links

def gen_athlete_page(data, outfile, men_athletes, women_athletes):
   # Generate athlete-specific navigation links
   men_nav_links = generate_nav_links('mens_team', men_athletes)
   women_nav_links = generate_nav_links('womens_team', women_athletes)
   # template 
   # Start building the HTML structure
   html_content = f'''<!DOCTYPE html>
   <html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <!-- Get your own FontAwesome ID -->
       <script src="https://kit.fontawesome.com/YOUR_ID.js" crossorigin="anonymous"></script>


      <link rel = "stylesheet" href = "../css/reset.css">
      <link rel = "stylesheet" href = "../css/style.css">
      

      <title>{data["name"]}</title>
   </head>
   <body>
   <a href = "#main">Skip to Main Content</a>
   <nav>
    <button id="menu-button">Menu</button>
    <ul id="menu">
        <li><a href="../index.html">Home Page</a></li>
        <li>
            <span class="team">Men's Team</span>
            <ul class="submenu">
                {men_nav_links}
            </ul>
        </li>
        <li>
            <span class="team">Women's Team</span>
            <ul class="submenu">
                {women_nav_links}
            </ul>
        </li>
    </ul>
</nav>
   <header>
      <!--Athlete would input headshot-->
       <h1>{data["name"]}</h1>
      <img src="../images/profiles/{data["athlete_id"]}.jpg" alt="Athlete headshot" width="200"> 
   </header>
   <main id = "main">
      <section id= "athlete-sr-table">
         <h2>Athlete's Seasonal Records (SR) per Year</h2>
            <table>
                  <thead>
                     <tr>
                        <th> Year </th>
                        <th> Season Record (SR)</th>
                     </tr>
                  </thead>
                  <tbody>
                  '''
   
   for sr in data["season_records"]:
      sr_row = f'''
                     <tr>
                        <td>{sr["year"]}</td>
                        <td>{sr["sr"]}</td>
                     </tr>                  
               '''
      html_content += sr_row

   html_content += '''                   
                </tbody>
                  </table>
                     </section>

                        <h2>Race Results</h2>

                        <section id="athlete-result-table">
                           

                           <table id="athlete-table">
                              <thead>
                                 <tr>
                                    <th>Race</th>
                                    <th>Athlete Time</th>
                                    <th>Athlete Place</th>
                                    <th>Race Comments</th>
                                 </tr>
                              </thead>

                              <tbody>
                  '''

   # add each race as a row into the race table 
   for race in data["race_results"]:
      race_row = f'''
                                 <tr class="result-row">
                                    <td>
                                       <a href="{race["url"]}">{race["meet"]}</a>
                                    </td>
                                    <td>{race["time"]}</td>
                                    <td>{race["finish"]}</td>
                                     <td>{race["comments"]}</td>
                                 </tr>
      '''
      html_content += race_row

   html_content += '''
                              </tbody>

                        </table>
                     </section>
                     <section id = "gallery">
                     <h2>Gallery</h2>
                      </section>
                     </main>
                     <footer>
                     <p>
                     Skyline High School<br>
                     <address>
                     2552 North Maple Road<br>
                     Ann Arbor, MI 48103<br><br>

                     <a href = "https://sites.google.com/aaps.k12.mi.us/skylinecrosscountry2021/home">XC Skyline Page</a><br>
                    Follow us on Instagram <a href = "https://www.instagram.com/a2skylinexc/"><i class="fa-brands fa-instagram" aria-label="Instagram"></i>  </a> 


                     </footer>
                     <script src="../js/script.js"></script>
               </body>
         </html>
   '''

   with open(outfile, 'w') as output:
      output.write(html_content)


def main():
    # Define the folder paths
    men_folder = 'mens_team/'
    women_folder = 'womens_team/'

    # Get all csv files in the men's folder
    men_csv_files = glob.glob(os.path.join(men_folder, '*.csv'))
    men_csv_file_names = [os.path.basename(file) for file in men_csv_files]

    # Get all csv files in the women's folder
    women_csv_files = glob.glob(os.path.join(women_folder, '*.csv'))
    women_csv_file_names = [os.path.basename(file) for file in women_csv_files]

    # Process each men's athlete data and generate pages
    for file in men_csv_file_names:
        athlete_data = process_athlete_data(os.path.join(men_folder, file))
        gen_athlete_page(athlete_data, os.path.join(men_folder, file.replace(".csv", ".html")), men_csv_file_names, women_csv_file_names)

    # Process each women's athlete data and generate pages
    for file in women_csv_file_names:
        athlete_data = process_athlete_data(os.path.join(women_folder, file))
        gen_athlete_page(athlete_data, os.path.join(women_folder, file.replace(".csv", ".html")), men_csv_file_names, women_csv_file_names)

if __name__ == '__main__':
    main()