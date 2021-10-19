# MHACKS-14-fastrfood
Project can be viewed here: https://tinyurl.com/fastrfood

# Inspiration
Our team members are no fans of the long lines often required to check into a dining hall at UMich. We wanted to create a nifty solution to allow hungry students to eat sooner. In particular, we wanted to provide informed decisions about when it is faster to wait in line at one dining hall, or commute to another one in hopes of a shorter line.

# What It Does
Our web and mobile application allows students to input how long they will wait at one dining hall, and figures out what is the fastest way for them to get food (either stay or go to a different dining hall). This calculation occurs using crowdsourced data from other students using the application at other dining halls, and accounts for commute times using the Google Maps API. Additionally, old data is removed from the database as new data comes in, making sure waiting times are up to date, as well as keeping the database from getting too big.

# How We Built It
With crowdsourced information from other users, we create recommendations as to whether the user should wait in line or go to a different dining hall. For our frontend interface, we used HTML, CSS, and JavaScript in the bootstrap framework. For the backend, we used Firebase to record and store our data, and the Google Maps API to determine commute distances between dining halls.

# Challenges We Ran Into
One big challenge was that the majority of our team members were beginners to web development, particularly on the front end. Team members had to learn on the fly how to use certain frameworks to achieve our UI goals. Additionally, backend integration with both Firebase and Google Maps was challenging, requiring multiple database restructures in order to ensure the correct data could be accessed efficiently by the web app.

# Accomplishments That We're Proud Of
One accomplishment that we're proud of is integrating and using the Google Maps API, which allowed us to better calculate the walking time from one dining hall to another.

# What We Learned
In addition to gaining experience with the languages and frameworks we used, we also learned about registering a domain using Domain.com. Google Maps and advanced Firebase controls were also new experiences.

# What's Next For Fastr Food
One direction that we would want to take Fastr Food in would be to create a dropdown that would display the other users reported wait times and the time and date of their submission. This would be along similar lines as a social news aggregation platform like Reddit or Yelp. We see no reason why Fastr Food should be limited to just the UMich dining halls. In the future, we could expand to include restaurants, grocery stores, and other services the often involve waiting in line.

Additionally, as Fastr Food is applied on a large scale, more measures would need to be taken to protect the system from abuse. More effective input validation could involve ignoring inputs that vary drastically from the mean, as well as tracking user IDs to avoid duplicate submissions.
