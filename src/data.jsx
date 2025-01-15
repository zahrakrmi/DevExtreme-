const employee = {
  ID: 1,
  FirstName: 'John',
  LastName: 'Heart',
  CompanyName: 'Super Mart of the West',
  Position: 'CEO',
  OfficeNo: '901',
  BirthDate: new Date(1964, 2, 16),
  HireDate: new Date(1995, 0, 15),
  Address: '351 S Hill St.',
  City: 'Los Angeles',
  State: 'CA',
  Zipcode: '90013',
  Phone: '+1(213) 555-9392',
  Email: 'jheart@dx-email.com',
  Skype: 'jheart_DX_skype',
};
const کشور =[
  'HR Manager',
  'IT Manager',
  'CEO',
  'Controller',
  'Sales Manager',
  'Support Manager',
  'Shipping Manager',
]
export const nameLabel = { 'aria-label': 'Name' };
export const lastnameLabel = { 'aria-label': 'Name' };
export const codeLabel = { 'aria-label': 'code' };
export const phoneLabel = { 'aria-label': 'phone' };
export const emailLabel = { 'aria-label': 'Email' };
export const maskLabel = { 'aria-label': 'Mask' };
export const dateLabel = { 'aria-label': 'Date' };
export const cityLabel = { 'aria-label': 'City' };
export const addressLabel = { 'aria-label': 'Address' };
export const passwordLabel = { 'aria-label': 'Password' };
export const countryLabel = { 'aria-label': 'Country' };

export default {
  getEmployee() {
    return employee;
  },
  getPositions() {
    return کشور;
  },
};


