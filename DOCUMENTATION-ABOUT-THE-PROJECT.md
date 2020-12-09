What is the project about:

    It's about making it easier for people who want to shere their trip or ride.
    When you want to go from point A to point B but instead of teaking the buss 
    you want to go with someone else.And if you hapens going  from point A to point B 
    and you don't want to drive alone for N hours.

Project Architecture : 

    Site navigation and accessibility:

        When you are logged of : 
            you can see the about page,posts page and the register page.
            you cant perform any special operation aside from viewing the current posts.

        When you are logged in :
            you can see the posts page and profile page
            you can create posts
            you can see thee posts details
            you can view other's people profiles

        When in yuor profile page :
            If you dont have personal information you will see a form where you can add it 
            If you have personal info :
                you can see your active and nonactive posts and your reviews left from other people
                You can edit and delete the posts
                And you can edit your personal info
        
        When not in yuor profile page :
            If person dont have personal info  you see that
            If person has personal info 
                you can see his posts 
                you can leave a review for that person
                you can edit and delete the reviews left by you
        
        When is posts page :
            You see all the posts
            You can edit and delete your posts
            You can contact other ppeople
            If a person doesnt have personal information you can see only his email From contact

Implementations:

    Databe : Firebase with angular fire

    For the HTML and CSS : Angular Materials

    state management : with RxJS 
        
    