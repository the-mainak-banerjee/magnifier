# MAGNIFIER

A Productivity App Which Helps You To Maintain A Laser-Like Focus & Be Productive


>[Click Here](https://the-magnifier.netlify.app/) To See The Live App

## Functionalities

- User Auth (Create New Account, Log In)
- User can only be able to use all the functionalities after logging in.
- KIS:- Keep It Simple- This will help you to track the top 5 most important tasks of the day.
- Pomodoro:- Do focus work by using this Pomodoro timer. You can also track the history of your Pomodoro
- Notes:- Take quick notes, and organize them in folders. Also, you can archive or move a note to trash or permanently delete them.
- Dark mode:- Users can use this web app in dark mode also.

## Features

### `Auth`
- Can create an account and login into the account.
- After login users will be redirected to either the "KIS" page or the page that they were trying to access before logging in.
- If users try to access the auth pages after login then they will be redirected to the "KIS" page.

### `KIS`
> KIS Stands for Keep It Simple. We use this technique to complete our urgent and important tasks of that day. You should decide on a minimum of 2 and a maximum of 5 KIS tasks for the day and try to complete them that day only.

- Can add tasks by clicking on Add KIS button. This will open a popup for task adding.
- After adding a task user can edit it by clicking on the pencil icon and delete it by clicking on the Trash icon.
- User can add a maximum of 5 tasks.
- After adding all the tasks user can click on the `Close` button to close the task adding modal.
- Users can click on the tick mark icon to mark a task as complete and undo icon to mark a completed task as incomplete.
- Add more task button will open the task adding model.
- At the end of the day user can click on the `End The Day` button to store that day's KIS history.
- Before ending the day user have to select a date. Users can not store multiple histories for the same day.
- `Show KIS History` button will display the list of KIS history.

### `Pomodoro`
>The Pomodoro Technique is a time management system. Using this method, you break your workday into 25-minute chunks separated by five-minute breaks. These intervals are referred to as Pomodoro. After about four Pomodoro, you take a longer break of about 15 to 20 minutes. [Read More](https://todoist.com/productivity-methods/pomodoro-technique)

- User can add a task or select a task from KIS to focus on.
- After adding a task they can start the Pomodoro timer of either 25 minutes or 35 mins by clicking on the `Start To Focus` button.
- After adding tasks a task list will be created. In that task list, the user can click on the Pencil icon to edit one particular task, the Tick Mark icon to mark that task as complete, Trash icon to delete a task.
- Also in that list of tasks user can see which task takes how many Pomodoro of how many minutes.
- User can also start the Pomodoro timer by clicking on the `Start Task` button to start the Pomodoro timer and that particular task will be selected as the currently focused task.
- In the task list if a user made any changes in a task that is a part of the KIS task, then that change will be reflected on the KIS page also.
- While the Pomodoro timer is running user can pause it by clicking on the `Pause` button or reset it by clicking on the `Reset` button.
- At the end of a Pomodoro, the Pomodoro timer will be replaced by a Short Break timer.
- User can also start the Pomodoro timer without selecting or adding a task.
- User can change the Pomodoro time or short break time by clicking on the `Gear` icon beside the `Start To Focus` button.

### `Notes`

- User can create a new note by following this step-
  1. Click on the `Take A Note` section.
  2. Give the title of the note. [If the user doesn't give a title then automatically that note will be called 'Untitled']
  3. Click on Create note. It will redirect the user to the notes editor page.
  4. On the notes editor page users can add notes. It will get saved automatically.
  5. On the notes editor page user can change the title also.
  >If the user follows this step inside a folder then that note will be automatically added to that folder.
  
- User can pin/unpin a note, archive/unarchive a note, and also move a note to the trash and restore that note from the trash.
    >User can Do these steps by selecting multiple notes together.
  
- User can go to the notes editor page to edit a particular note by clicking on the `View` button on that note.
- On the trash page user can delete a note permanently by clicking on the `Trash` icon.
- User can add a note to a folder by clicking on the folder icon on a notes card. Either they can create a new folder or select a folder from a list.
- On the folder page user can see all the folders. And `View` button on the folder card will redirect the user to the notes page where the user can only see the notes inside that folder.
- User can also edit the name of a folder and delete a folder.
- You Can also search notes based on their title & description.

### `Profile`

- On the profile page users can see the account details that user.
- Also users can see Pomodoro details of a particular date.
- Also user can see notes details, which includes the Number of 'Active Notes', 'Archived Notes', and 'Trashed Notes'


## Technologies Used

- React JS
- React Router
- React Icons
- React Context
- Firebase[Storage, Auth, Firestore]
- Chakra UI


## Screens

### `KIS`

![image](https://user-images.githubusercontent.com/94280354/184859714-94c6a277-45e4-44d0-8cb6-77ae8fff33a7.png)

![image](https://user-images.githubusercontent.com/94280354/184859895-3d062e59-90d2-45f2-bd42-017f4201df21.png)


### `Pomodoro`

![image](https://user-images.githubusercontent.com/94280354/184861053-bc262e17-4237-47d3-bcf5-10c707648ebe.png)

![image](https://user-images.githubusercontent.com/94280354/184860048-2af4ef1e-1bae-4eef-8d80-3067ff519513.png)


### `Notes`

![image](https://user-images.githubusercontent.com/94280354/184860244-ab9c8662-96fc-41dc-a7b2-17ab9bcb0df3.png)

![image](https://user-images.githubusercontent.com/94280354/184860294-46ab14ac-8bf1-442f-93f7-fa58411181fb.png)

![image](https://user-images.githubusercontent.com/94280354/184860408-13693b0e-0595-4ece-a99b-6b8fc4d942a1.png)

![image](https://user-images.githubusercontent.com/94280354/184860520-87b0d1de-c437-44ab-b4ce-d01b393299a2.png)




