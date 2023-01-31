Feature: House reservations management 
As a house owner
I want to manage the reservations 
So that I keep track of the number of reservations and be sure I'm profiting 

Scenario: Approving a reservation
Given the house owner has a pending reservation
When they access the reservation management page
And they click to approve the reservation
Then the house owner receives the confirmation of the reservation
And the user who reservated the house also receives the reservation
And the house owner can't see this reservation as pending anymore

Scenario: Denying a reservation
Given the house owner has a pending reservation
When they access the reservation management page
And they click to deny the reservation
Then the house owner can't see this reservation as pending anymore
And the user who reservated the house receives a notification that the reservation was denied 

Scenario: Reservation information
Given my house has reservations
When a house owner access the rent management page 
And select an approve reservation
Then the time frame for this reservation is displayed
And the user who reservated information is displayed
And the price for the reservation is displayed

Scenario: Canceling a reservation
Given the house owner has a confirmed reservation
When they access the reservation management page
And they click to cancel the reservation
Then the house owner can't see this reservation as confirmed anymore
And the user who reservated the house receives a notification that the reservation was canceled

Scenario: Dummy Scenario
Given lore
When ipsum
Then dolor