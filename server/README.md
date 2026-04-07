
# AUTHENTICATION ENDPOINTS

## *Registration :-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/v1/auth/register

method :- post

payload (req.body) :- name, email, password, role


## *Login:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/v1/auth/login

method :- post

payload :- name, email

## *Logout:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/v1/auth/logout

method :- delete

payload :- none

## *Otp sending :-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/v1/auth/otp/send 

method :- post

payload :- email

❌ (Note: Nodemailer/SMTP configuration issue) Not working in production. need to resolve

## *Otp verification:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/v1/auth/otp/verify

method :- post

payload :- email,otp

# USER ENDPOINTS

## *Fetch all users*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/users

method :- get

payload :- none

## *Get current user*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/users/current

method :- get

payload :- none

## *update current user*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/users/

method :- patch

payload :- { name, email, password, role }  (send which needs to be updated)

## *Fetch all users*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/users/

method :- delete

payload :- none

# IoT ENDPOINTS

## *Get ESP-32 data continuously after some interval:-*

 ⚠️⚠️⚠️This route in only for ESP-32 module and not for frontend. Do not include in production. ⚠️⚠️⚠️

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/bins/esp-32

method :- patch

payload :- fill, distance, binId (sent by ESP-32 module)

# BIN ENDPOINTS

## *Create Bin:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/bins

method :- post

payload :- location, binHeight, binId, area

## *Get data of a specific bin:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/bins/:binid

method :- get

payload :- none/binid

## *Delete a specific Bin:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/bins/:binId

method :- delete

payload :- none

# DRIVER ENDPOINTS

## *Get all drivers:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/drivers

method :- get

payload :- none

## *Create a driver:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/drivers

method :- post

payload :- { userId, vehicleNumber, liscenceNumber }

## *Get a specific driver:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/drivers/:driverId

method :- get

payload :- none

## *Get driver by userId:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/drivers/users/:userId

method :- get

payload :- none

## *update driver status:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/drivers/:driverId/status

method :- patch

payload :- status

# DRIVER LOCATION ENDPOINTS

## *Add/Update driver location:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/driver/location

method :- post

payload :- { driverId, lng, lat } //longiture and latitude

## *Get latest location of a specific driver:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/driver/:driverId/location

method :- get

payload :- none

## *Get location history of a specific driver:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/driver/:driverId/location/history

method :- get

payload :- none

## *Get nearby location of drivers:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/driver/nearby/location?lng=&lat=distance=5000

method :- get

payload :- none

query = { lng, lat, distance = 5000 }

## *Delete location history/logs of a specific driver:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/driver/:driverId/location/logs

method :- delete

payload :- none

# PICKUP ENDPOINTS

## *Create pickup request (MANUALLY):-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/pickups

method :- post

payload :- binId

## *Get all pickup requests:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/pickups

method :- get

payload :- none

## *Get a single pickup requests by Id:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/pickups/:pickupId

method :- get

payload :- none

## *Get a pickup assigned to a driver:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/pickups/driver/:driverId

method :- get

payload :- none

## *Accept a pickup request:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/pickups/:pickupId/accept

method :- patch

payload :- driverId (who accepts the request)

## *Complete a requested pickup job:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/pickups/:pickupId/complete

method :- patch

payload :- none

## *Delete a pickup (ONLY FOR ADMIN) :-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/pickups/:pickupId

method :- delete

payload :- none

# ALERT ENDPOINTS

## *Get all alerts :-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/alerts

method :- get

payload :- none

## *Get one alert by id :-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/alerts/:id

method :- get

payload :- none

## *Get alerts for a specific bin :-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/alerts/bins/:binId

method :- get

payload :- none

## *Resolve an alert :-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/alerts/:id/resolve

method :- patch

payload :- none

## *Delete an alert by id :-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/alerts/:id

method :- delete

payload :- none

# ROUTE OPTIMIZATION ENDPOINTS

## *Create Route :-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/routes

method :- post

payload :-  driverId, bins 

## *Get all Route :-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/routes

method :- get

payload :- none

## *Get route for a driver :-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/routes/drivers/:driverId

method :- get

payload :- none

## *Get route by Id :-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/routes/:id

method :- get

payload :- none

## *Generate optimized route :-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/routes/:driverId/optimize?lng=&lat=

method :- post

payload :- none

## *Delete a route :-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/routes/:id

method :- delete

payload :- none
