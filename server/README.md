
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

method :- get

payload :- none

## *Otp sending :-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/v1/auth/otp/send 

method :- post

payload :- email

not working in production. need to resolve

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

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/user/current

method :- get

payload :- none

## *update current user*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/user/update

method :- patch

payload :- { name, email, password, role }  (send which needs to be updated)

## *Fetch all users*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/user/delete

method :- delete

payload :- none

# BIN ENDPOINTS

## *Get ESP-32 data continuously after some interval:-*

 ⚠️⚠️⚠️This route in only for ESP-32 module and not for frontend. Do not include in production. ⚠️⚠️⚠️

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/bin/esp-32/update

method :- patch

payload :- fill, distance, binId (sent by ESP-32 module)

## *Create Bin:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/bin/create

method :- post

payload :- location, binHeight, binId

## *Get data of a specific bin:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/bin/:binid

method :- get

payload :- none/binid

## *Create Bin:-*

endpoint :- https://smart-city-dustbin-management-system.onrender.com/api/bin/create

method :- post

payload :- location, binHeight, binId
