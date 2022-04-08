
Tavern Pub - Tavern Pub is for the elite and the most influential in the society.
=======

## Getting Started
Clone the Repo.
-------------
`git clone https://github.com/Alpha1202/bev-coding-test-be.git`

## Prerequisites
The following tools will be needed to run this application successfully:
* Node v10.15.0 or above
* Npm v6.4 or above
* mysql

## Installation
**On your Local Machine**
- Pull the [develop](https://github.com/Alpha1202/bev-coding-test-be.git) branch off this repository
- Run `yarn i` to install all dependencies
- Run `yarn run dev` to start the app
- Access endpoints on **localhost:6060**

---

## API Spec
The preferred JSON object to be returned by the API should be structured as follows:

### Login
```source-json
{
    "status": "success",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5NDdjZGI2LTc2MTItNGNmMC1iODQ5LWU0MjUwYWRjZTM2YyIsImVtYWlsIjoibnp1YmVubmFtYW5pQGdtYWlsLmNvbSIsImlhdCI6MTY0OTQxNjEzNCwiZXhwIjoxNjQ5NTAyNTM0fQ.Y1OlnE6z55ddcjFRBo92gRzDUnqqFWLxbTKMgu8XUDo",
        "user": {
            "id": "7947cdb6-7612-4cf0-b849-e4250adce36c",
            "first_name": "Nzube",
            "last_name": "Alpha",
            "email": "nzubennamani@gmail.com",
            "passport": "https://res.cloudinary.com/de8vrxbqq/image/upload/v1649409038/binxswajvi0smiumnksh.jpg",
            "phone_number": "08139228639"
        }
    }
}
```
### Sign up
```source-json
{
    "status": "success",
     "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5NDdjZGI2LTc2MTItNGNmMC1iODQ5LWU0MjUwYWRjZTM2YyIsImVtYWlsIjoibnp1YmVubmFtYW5pQGdtYWlsLmNvbSIsImlhdCI6MTY0OTQxNjEzNCwiZXhwIjoxNjQ5NTAyNTM0fQ.Y1OlnE6z55ddcjFRBo92gRzDUnqqFWLxbTKMgu8XUDo",
        "user": {
            "id": "7947cdb6-7612-4cf0-b849-e4250adce36c",
            "first_name": "Nzube",
            "last_name": "Alpha",
            "email": "nzubennamani@gmail.com",
            "passport": "https://res.cloudinary.com/de8vrxbqq/image/upload/v1649409038/binxswajvi0smiumnksh.jpg",
            "phone_number": "08139228639"
        }
    }
}
```

### Change Password
```source-json
{
    "status": "success",
    "data": "Password successfully changed"
}
```

### send reset token
```source-json
{
    "status": "success",
    "data": [
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5NDdjZGI2LTc2MTItNGNmMC1iODQ5LWU0MjUwYWRjZTM2YyIsImlhdCI6MTY0OTQwMjY1OSwiZXhwIjoxNjQ5NDg5MDU5fQ.vdmPguCTEXxuA85nXSFsAwiOw7cfAMv9BKv5vSklR6I",
            "tempToken": "5TkBFD"
        }
    ]
}
```

### Reset Password
```source-json
{
    "status": "success",
    "data": "Password reset successful"
}
```

### Change Passport
```source-json
{
    "status": "success",
    "data": "Passport changed successfully"
}
```


### Errors and Status Codes
If a request fails, expect errors in the following format:

```source-json
 {
    status: 'Request Failed',
    error
}
```
### Other status codes:

201 for created

200 for success

500 for server error and/or general errors caught in the try/catch

404 for Not found requests, when a resource can't be found to fulfill the request

401 for Not Authorized

400 Bad Request

Endpoints:
----------

### Login:

`POST /api/v1/login`

Example request body:

```source-json
{
    "email": "nzubennamani@gmail.com",
    "password": " SomePassword@9"
}
```

No authentication required, returns a user object if found



### Sign up:

`POST /api/v1/signup`

Example request body:

```source-json
{
    "email": "nzubennamani@gmail.com",
    "password": " SomePassword@9",
    "first_name": "Some name",
    "last_name": "Some name",
    "passport": "file path",
    "phone_number": 08012345678"
}
```

### Change Password:

`POST /api/v1/changePassword`
Example request header:

```source-json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
}
```

Example request body:

```source-json
{
    "old_password": "SomeOldPassw@rd@9",
    "new_password": "SomeNewPassw@rd@9",
    "confirm_password": "SomeNewPassw@rd@9"
}
```

### send reset token:

`POST /api/v1/sendResetToken`

Example request body:

```source-json
{
    "email": "nzubennamani@gmail.com",
}
```
No authentication required, returns returns a user object if found

### reset password:

`POST /api/v1/resetPassword/${token}`

Example request body:

```source-json
{
    "new_password": "SomePassword@9",
    "confirm_password": "SomeNewPassword@9"
}
```

### Change Passport:

`POST /api/v1/editprofile`

Example request body:

```source-json
{
    "passport": "some file",
}
```


### .env sample:

`LOCAL_DATABASE_USERNAME`
`LOCAL_DATABASE_PASSWORD`
`LOCAL_DATABASE_DBNAME`
`LOCAL_DATABASE_HOST`
`LOCAL_PORT`
`PORT`
`SECRET`
`SENDGRID_API_KEY`
`CLOUD_NAME`
`CLOUDINARY_API_KEY`
`CLOUDINARY_SECRET`