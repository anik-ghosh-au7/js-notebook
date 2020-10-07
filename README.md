##### FULL STACK WEB DEVELOPMENT
# [JS-NOTEBOOK](https://js-notebook.herokuapp.com/)
### A website dedicated to javascript developers
##### By - [Anik Ghosh](https://github.com/anik-ghosh-au7) & [Abhishek Asarawa](https://github.com/abhishek-aasarawa-au7)
#
#
_____
![JS_Notebook](https://res.cloudinary.com/dtyzqbg4a/image/upload/v1602055396/Default/JS-Notebook_ccszjp.png)
### Introduction:
The JS-NoteBook is a web application that you can use to create and share documents that contain live javascript code, equations, visualizations, text, images and graphs. You can download your notebook in pdf format by just one click.
Knowledge is meant to share, it should not be restricted by anything. We try to keep the website open for anyone. To start working, you do not have to create an account. 

#### Description
                      To get started, all you need to do is visit the online web page and create a new notebook. It will also show the user’s previous notebooks. The user on his/ her discretion can choose to make any notebook public or private, the public notebooks will be visible to all other users. The user can also choose collaborator/(s) to work on a notebook, these collaborators will have read & write access to the notebooks.
	
##### You can add following features in your notebook:
#
1. **Note**: To add text in your notebook you can add a note component. 
2. **Image**: You can add an image in just two clicks with drag and drop feature, it is easier to do.
3. **Code**: Well, if you want to add javascript code in your notebook, it is just one click away. And the good part is you can compile your code easily.
4. **Chart**: Want to add a chart in your notebook ? well, it is also possible here. There are so many types of charts from which you can select the one that suits your notebook best. 
5. **Link**: You can easily save links to external websites. And you can give these links the name you want.

You can download your notebook in pdf format which comes in very good structure.
#
#### Other Features: 
1. If a user happens to forget his/her password, he/she can change the password.
2. User authorization via Google.
3. User authorization via GitHub.
4. User Profile.
5. Users can add their profile picture.
6. Users can create, read, update and delete his/her notebooks on the website.
7. Users can search notebooks on the website.
8. Users can share and collaborate with other users.
9. Users can download their notebooks.
10. Users can make his/her notebook public or private.
#
#### TECH STACK:
1. **Front End** - React JS, Redux, Bootstrap, Styled Components, etc.
2. **Back End** - Node Js, Express, Passport, JWT, Bcrypt, Cloudinary, Multer, etc.
3. **DataBase** - MongodB, Mongoose.
4. **Deployment Server** - Heroku
5. **UI Framework** - Material UI
#
#
#### Work:
1. ##### Frontend:
    a. **Home Page**:
    This is the visitor page of the website. Here user can do following things:
    * Sign-Up
    * Sign-In
    * After authorization user can see his/her profile and can edit it
    * Sign-Out

    b. **Create Page**:
    This is the main page of the website. It is not protected. Anyone can come here. Here user can do following tasks:
    * Create Notebook
    * Add, Delete, Update and Rearrange the components of notebooks.
    * Save Notebook ( Only if user is sign in )
    * Delete Notebook ( Only if user is sign in )
    * Share Notebook with other users ( Only if user is sign in )
    
   c. **All Notebooks Page**:
	Here the user can see all his/her saved notebooks. He can edit these notebooks easily.

    d. **Shared Notebooks Page** :
	Here users can see shared notebooks. The notebooks are separately arranged in shared and received folders. The received notebooks are editable except author and title fields. The shared notebooks are owned by the author so they are fully editable by the user.

    e. **Searched Notebooks Page**:
	Here the user can see all notebooks that he/she searched from the search bar. Users can search notebooks respective to the title of notebook or author name.
	#
2. ##### Backend:
    a. **Sign-Up Route**:
    - Purpose: For Creating an account.
    - Request: Email-Id, First name, Last name, Password
    - Response: Success Confirmation or Error Message
    
    b. **Sign-In Route**:
    - Purpose: User Authorization
    - Request: Email, Password
    - Response: Signed JWT Token or Error Message
    
    c. **Custom Route**:
    - Purpose: For Google and Github Authorization or New Account Creation
    - Request: Email, Github Link, First name, Last name, User Image
    - Response: Signed JWT Token or Error Message
    
    d. **User Profile Update Route (Protected Route)**:
    - Purpose: For Updating User Profile
    - Request: Signed JWT Token, Data to update
    - Response: Success Confirmation or Error Message
    
    e. **Account Recovery Route**:
     Purpose: For Resetting Password.
    * First Step:
        - Request: Email ID
        - Response: OTP will be sent to user email if user found in database else error message
    * Second Step:
        - Request: OTP, Email ID
        - Response: If OTP matched message for password reset or error message
    * Third Step:
        - Request: New Password, Email ID
        - Response: Success Confirmation or Error Message

    f. **Create and Update Routes for notebooks (Protected Route)**:
    - Purpose: For Creating, Updating and Deleting Notebooks or Notebook Components
    - Request: Notebook details (as mentioned before), Signed JWT Token
    - Response: Success Confirmation or Error Message
    
    g. **Delete Notebook Route (Protected Route)**:
    - Purpose: For deleting notebook from database.
    - Request: Notebook ID, Signed JWT Token
    - Response: Success Confirmation or Error Message
    
    h. **Notebook Share Route (Protected Route)**:
    - Purpose: For Sharing Notebook with other Users
    - Request: Signed JWT Token, Notebook ID, Email ID of User with Whom Notebook will be Shared
    - Response: Success Confirmation or Error Message
    
    i. **All Notebooks Route (Protected Route)**:
    - Purpose: For Fetching all User Notebooks
    - Request: Signed JWT Token
    - Response: Notebooks List, Success Confirmation or Error Message
    
    j. **Shared Notebooks Route (Protected Route)**:
    - Purpose: For Fetching all Shared User Notebooks
    - Request: Signed JWT Token
    - Response: Notebooks List, Success Confirmation or Error Message
    
    k. **Received Notebooks Route (Protected Route)**:
    - Purpose: For Fetching all Received User Notebooks
    - Request: Signed JWT Token
    - Response: Notebooks List, Success Confirmation or Error Message
    
    l. **Searched Notebooks Route**:
    - Purpose: For Fetching all Searched Notebooks
    - Request: Search Query
    - Response: Notebooks List, Success Confirmation or Error Message
    
    m. **Image Upload Route**:
    - Purpose: For Uploading Image
    - Request: Image Data
    - Response: Image Cloudinary Url, Success Confirmation or Error Message
    
    n. **Code compilation Route**:
    - Purpose: For Compiling the Javascript Code
    - Request: Code to be compiled
    - Response: Compilation Output, Success Confirmation or Error Message
    #
    #
#### Future Work:
1. Users can collaboratively work on notebooks in real time.
2. Folder Component for notebook
3. Public and Private rights for notebooks
4. Adding more languages in the code component.
5. Discussion Forum
6. Custom extension for notebooks with complete offline support.
7. Implementing Micro Services
#
#
#### References:
1. Jupyter Notebooks for Idea and Design
2. MDN Web Docs
3. React JS Org
4. StackOverFlow and Quora  websites
5. Youtube
6. Google Developers Docs
7. Github Developers Docs
8. NPM JS 

