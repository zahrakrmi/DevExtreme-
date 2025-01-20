const employeeDataKey = 'employeeData'; // کلیدی برای ذخیره اطلاعات در localStorage

export const getEmployee = () => {
  const storedData = localStorage.getItem(employeeDataKey);
  if (!storedData) {
    console.error('No employee data found in localStorage.');
    return {
      نام: '',
      نام_خانوادگی: '',
      کد_ملی: '',
      شماره_شناسنامه: '',
      تاریخ_تولد: '',
      محل_صدور: '',
      شماره_اقتصادی: '',
      کشور: '',
      استان: '',
      شهر: '',
      کدپستی: '',
      آدرس: '',
      ایمیل: '',
      تلفن_ثابت: '',
      شماره_همراه: '',
      حساب_بانکی: '',
      شعبه_بانکی: '',
      شماره_شبا: '',
      شعبه_بیمه: '',
      زمینه_فعالیت:''
    };
  }
  return JSON.parse(storedData);
};

export const simpleProducts = [
  'پیمانکار',
  'مشاوره',
  'فروشنده',
  'مزایده گر',
  'سازنده',
  'تولید کننده',
  'خریدار،بهره بردار یا کارفرما',
];
export const productLabel = { 'aria-label': 'Product' };
// بروزرسانی اطلاعات در localStorage
export const updateEmployee = (newData) => {
  localStorage.setItem(employeeDataKey, JSON.stringify(newData));
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
export const lastnameLabel = { 'aria-label': 'lastName' };
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


