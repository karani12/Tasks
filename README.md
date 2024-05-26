# Task Management System
This is the API built simply. Supports **`Authentication`**, **`Email sending`** and **`Task Management`**.

## Features
- **`Authentication`**
  - Register
  - Login
  - Get User Details
  - Role Based Access Control(admin/user)
- **`Email sending`**(using a custom simple queue database driver)

## Description
The task system operates by using `JWT` for authentication. The system has two roles, `admin` and `user`. Only the admin can create and assign tasks to users or to themseleves. Each User has only one role, to mark the task as complete. 

The system will send an email notification to the user once they are assigned a task. It will also send an email notification to the admin once the user marks the task as complete.

The database has been seeded with several users and tasks. The admin credentials are:
```
email: Murphy.Funk38
password: password
```

### improvements
With enough reources and time, the following improvements can be made to the system:

- **`Pagination`** for the tasks and users
- **`Search`** for the tasks and users
- **`In App Notifications`** for the user when they are assigned a task(when they are online using websockets)
- **`A more robust authentication`** system with password reset and email verification
- **`A more robust email sending system`** with email templates
- **`Use of better queue drivers`** like redis or rabbitmq