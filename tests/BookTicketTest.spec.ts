import { test } from "@playwright/test";

test('TC12: User can book 1 ticket at a time', async ({ page }) => { 
    const expectedMsg = "Ticket booked successfully!";
    console.log('Pre-condition: an actived account is existing');
    console.log('1. Navigate to QA Railway Login page');
    console.log('2. Login with a valid account');
    console.log('3. Click on \"Book ticket\" tab');
    console.log('4. Select the next 2 days from \"Depart date\"');
    console.log('5. Select Depart from \"Nha Trang\" and Arrive at \"Huế\"');
    console.log('6. Select \"Soft bed with air conditioner\" for \"Seat type\"');
    console.log('7. Select \"1\" for \"Ticket amount\"');
    console.log('8. Click on \"Book ticket\" button');
    console.log('VP: Message \"Ticket booked successfully!\" displays. Ticket information display correctly (Depart Date,  Depart Station,  Arrive Station,  Seat Type,  Amount)');
 })