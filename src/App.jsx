import React, {
  useCallback, useMemo, useRef, useState,
} from 'react';
import 'devextreme-react/text-area';
import { TextBox, Button as TextBoxButton } from 'devextreme-react/text-box';
import Form, {
  SimpleItem,
  GroupItem,
  TabbedItem,
  TabPanelOptions,
  Tab,
  Label,
} from 'devextreme-react/form';
import GroupCaption from './GroupCaption.jsx';
import Button from 'devextreme-react/button';
import Globalize from "globalize";
import faCldr from "cldr-data/main/fa/ca-gregorian.json";
import numbersFa from "cldr-data/main/fa/numbers.json";
import timeZoneData from "cldr-data/supplemental/timeData.json";
import likelySubtags from "cldr-data/supplemental/likelySubtags.json";
import LabelTemplate from './LabelTemplate.jsx';
import notify from 'devextreme/ui/notify';
import { getEmployee, updateEmployee } from './data.jsx';

import {
  Validator,
  RequiredRule,
  EmailRule,
  AsyncRule,
} from 'devextreme-react/validator';
import {
  addressLabel,
  emailLabel,
  nameLabel,
  lastnameLabel,
  codeLabel,
  phoneLabel
} from './data.jsx';

import Upload from './Upload.jsx';

import { locale } from "devextreme/localization";
locale("fa");
import "devextreme/dist/css/dx.light.css";



Globalize.load(faCldr, numbersFa, timeZoneData, likelySubtags);
Globalize.locale("fa");


// فعال‌سازی راست‌چین
const rtlEnabled = true;
<Form
  rtlEnabled={rtlEnabled}
/>;
// تنظیم زبان
locale("fa");

const employee = getEmployee();
console.log(employee);

// const fieldMap = {
//   نام: 'firstName',
//   'نام خانوادگی': 'lastName',
//   'کد ملی': 'nationalCode',
//   ایمیل: 'email',
//   'شماره همراه': 'phoneNumber',
// };

// // تبدیل داده‌ها
// const employee = service.getEmployee();
// const translatedEmployee = {};

// Object.keys(fieldMap).forEach((key) => {
//   translatedEmployee[key] = employee[fieldMap[key]];
// });


const validationRules = {
  position: [{ type: 'required', message: 'فیلد الزامی می باشد' }],
  hireDate: [{ type: 'required', message: 'Hire Date is required.' }],
  required: [{ type: "required", message: "این فیلد الزامی است." }],

};

const hireDateEditorOptions = { width: '100%', value: null };











function sendRequest(value) {
  const invalidEmail = 'test@dx-email.com';
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value !== invalidEmail);
    }, 1000);
  });
}


const asyncValidation = (params) => sendRequest(params.value);

// const editorOptions = { items: service.getPositions(), searchEnabled: true, value: '' };
const groupCaptionNamedRender = (iconName) => {
  const groupCaptionRender = (data) => (
    <GroupCaption
      iconName={iconName}
      {...data}
    />
  );
  return groupCaptionRender;
};
export default function App() {
  const [formData, setFormData] = useState(getEmployee() ||{});

  const handleValueChange = (e, field) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData, [field]: e.value || '' };
      updateEmployee(updatedData); // ذخیره در localStorage
      return updatedData;
    });
  };
  
  function validateClick({ validationGroup }) {
    const result = validationGroup.validate();
    if (result.isValid) {
      updateEmployee(formData); // ذخیره داده‌ها در localStorage
      notify('اطلاعات با موفقیت ثبت گردید.', 'success');
    } else {
      notify('اطلاعات ثبت نشد. لطفا مجدد فیلدهای اجباری را بررسی نمایید', 'error');
    }
  }
  



  // function validateClick({ validationGroup }) {
  //   const result = validationGroup.validate(); // اعتبارسنجی اطلاعات
  //   console.log('Validation Result:', result);
  //   console.log('Broken Rules:', result.brokenRules);
  
  //   if (result.isValid) {
  //     service.updateEmployee(formData); // ذخیره اطلاعات در localStorage
  //     notify('اطلاعات با موفقیت ثبت گردید.', 'success');
  //   } else {
  //     result.brokenRules.forEach((rule) => {
  //       console.error(`Field: ${rule.selector}, Message: ${rule.message}`);
  //     });
  //     notify('اطلاعات ثبت نشد. لطفا مجدد فیلدهای اجباری را بررسی نمایید', 'error');
  //   }
  // }
  return (
    <React.Fragment>
      <div className="long-title">
        <h3>اطلاعات اصلی</h3>
      </div>
      <div className="form-container">
        <Form
          colCount={2}
          id="form"
          formData={formData}
        >
          <GroupItem
            captionRender={groupCaptionNamedRender('user')}
            caption="اطلاعات شخصی"
          >
            <TabbedItem>
              <TabPanelOptions deferRendering={false} />
              <Tab title="اطلاعات اولیه">
                <SimpleItem dataField="نام" editorType="dxTextBox" validationRules={validationRules.position} >
                  <TextBox
                  value={formData.نام} // مقدار فیلد
                  onValueChanged={(e) => handleValueChange(e, 'نام')}
                    validationMessagePosition="buttom"
                    inputAttr={nameLabel}
                  >
                    <Validator>
                      <RequiredRule message='اشتباه می باشد' />
                    </Validator>
                  </TextBox>
                </SimpleItem>

                <SimpleItem dataField="نام خانوادگی" editorType="dxTextBox" validationRules={validationRules.position}>
                  <TextBox
                   value={formData.نام_خانوادگی} // مقدار فیلد
                   onValueChanged={(e) => handleValueChange(e, 'نام_خانوادگی')}
                    validationMessagePosition="buttom"
                    inputAttr={lastnameLabel}
                  >
                    <Validator>
                      <RequiredRule message="وارد نمودن نام خانوادگی الزامی می باشد" />
                    </Validator>
                  </TextBox>
                </SimpleItem>

                <SimpleItem dataField="کد ملی" editorType="dxTextBox" validationRules={validationRules.position} >
                  <TextBox
                    value={formData.کد_ملی} // مقدار فیلد
                    onValueChanged={(e) => handleValueChange(e, 'کد_ملی')}
                    validationMessagePosition="buttom"
                    inputAttr={codeLabel}
                  >
                    <Validator>
                      <RequiredRule message="وارد نمودن کد ملی الزامی می باشد" />
                    </Validator>
                  </TextBox>
                </SimpleItem>

                <SimpleItem dataField="شماره شناسنامه" />
                <SimpleItem dataField="تاریخ تولد" editorType="dxDateBox" editorOptions={hireDateEditorOptions} />
                <SimpleItem dataField="محل صدور" />
                <SimpleItem dataField="شماره اقتصادی " editorType="dxNumberBox" editorOptions={{ format: "#" }} validationRules={validationRules.position} >
                  <TextBox
                   value={formData.شماره_اقتصادی} // مقدار فیلد
                   onValueChanged={(e) => handleValueChange(e, 'شماره_اقتصادی')}
                    validationMessagePosition="top"
                    inputAttr={phoneLabel}
                  >
                    <Validator>
                      <RequiredRule message='وارد نمودن شماره اقتصادی(جواز)الزامی می باشد' />
                    </Validator>
                  </TextBox>
                </SimpleItem>

              </Tab>
              <Tab title="لوگو">
                <Upload />
              </Tab>
            </TabbedItem>

            <GroupItem
              captionRender={groupCaptionNamedRender('card')}
              caption="آدرس تکمیلی"
            >
              <TabbedItem>
                <TabPanelOptions deferRendering={false} />
                <Tab title="آدرس">
                  <SimpleItem dataField="کشور"
                    editorType="dxSelectBox"
                    editorOptions={{
                      dataSource: [
                        { english: 'IRAN', persian: 'ایران' },
                        { english: 'USA', persian: 'ایالات متحده امریکا' },
                        { english: 'af', persian: 'افغانستان' },
                        { english: 'alman', persian: 'آلمان' },
                        { english: 'malezi', persian: 'مالزی' },
                        { english: 'hend', persian: 'هندوستان' },
                        { english: 'armnestan', persian: 'ارمنستان' },
                        { english: 'faranseh', persian: 'فرانسه' },
                        { english: 'canada', persian: 'کانادا' },
                        { english: 'danmark', persian: 'دانمارک' },
                        { english: 'espania', persian: 'اسپانیا' },
                        { english: 'turki', persian: 'ترکیه' },
                      ],
                      valueExpr: 'english',
                      displayExpr: 'persian'
                    }}
                    validationRules={validationRules.position}
                  >
                    <Label render={LabelTemplate('info')} />
                  </SimpleItem>
                  <SimpleItem dataField="استان" validationRules={validationRules.position} editorType="dxSelectBox" editorOptions={{
                    dataSource: [
                      { english: 'Tehran', persian: 'تهران' },
                      { english: 'mashhad', persian: 'مشهد' },
                      { english: 'kerman', persian: 'کرمان' },
                      { english: 'qom', persian: 'قم' },
                      { english: 'ahvaz', persian: 'اهواز' },
                      { english: 'markazi', persian: 'مرکزی' },
                      { english: 'tabriz', persian: 'تبریز' },
                      { english: 'rasht', persian: 'رشت' },
                      { english: 'gorgan', persian: 'گرگان' },
                      { english: 'khozestan', persian: 'خوزستان' },
                      { english: 'kerman', persian: 'کرمان' },
                      { english: 'yazd', persian: 'یزد' },
                    ],
                    valueExpr: 'english',
                    displayExpr: 'persian'
                  }} />

                  <SimpleItem dataField="شهر" validationRules={validationRules.position} />
                  <SimpleItem dataField="کدپستی" editorType="dxNumberBox"
                    editorOptions={{
                      format: "#"
                    }} />
                  <SimpleItem dataField="آدرس" editorType="dxTextBox" validationRules={validationRules.position} >
                    <TextBox
                      value={formData.آدرس} // مقدار فیلد
                      onValueChanged={(e) => handleValueChange(e, 'آدرس')}
                      validationMessagePosition="left"
                      inputAttr={addressLabel}
                    >
                      <Validator>
                        <RequiredRule message="وارد نمودن آدرس الزامی می باشد" />
                      </Validator>
                    </TextBox>
                  </SimpleItem>
                </Tab>
              </TabbedItem>


            </GroupItem>


          </GroupItem>

          <GroupItem
            captionRender={groupCaptionNamedRender('tel')}
            caption="راه های ارتباطی"
          >
            <TabbedItem>
              <TabPanelOptions deferRendering={false} />
              <Tab title="ارتباطات">
                <SimpleItem dataField="شماره همراه" editorType="dxNumberBox" editorOptions={{ format: "#" }} validationRules={validationRules.position} >
                  <TextBox
                  value={formData.شماره_همراه} // مقدار فیلد
                  onValueChanged={(e) => handleValueChange(e, 'شماره_همراه')}
                    validationMessagePosition="buttom"
                    inputAttr={phoneLabel}
                  >
                    <Validator>
                      <RequiredRule message="وارد نمودن شماره همراه الزامی می باشد" />
                    </Validator>
                  </TextBox>
                </SimpleItem>
                <SimpleItem dataField="تلفن ثابت" />
                <SimpleItem dataField="ایمیل" editorType="dxTextBox" validationRules={validationRules.position} >
                  <TextBox value={formData.ایمیل} // مقدار فیلد
                   onValueChanged={(e) => handleValueChange(e, 'ایمیل')} inputAttr={emailLabel} validationMessagePosition="top">
                    <Validator  >
                      <RequiredRule message="Email is required" validationMessagePosition="top" />
                      <EmailRule message="وارد نمودن ایمیل الزامی می باشد" />
                      <AsyncRule
                        message="Email is already registered"
                        validationCallback={asyncValidation}
                      />
                    </Validator>
                  </TextBox>
                </SimpleItem>

              </Tab>
            </TabbedItem>

            <GroupItem
              captionRender={groupCaptionNamedRender('user')}
              caption="اطلاعات حساب"
            >
              <TabbedItem>
                <TabPanelOptions deferRendering={false} />
                <Tab title="حساب">
                  <SimpleItem dataField="حساب بانکی"  editorType="dxNumberBox" editorOptions={{ format: "#" }}  >
                    <TextBox
                      value={formData.حساب_بانکی} // مقدار فیلد
                      onValueChanged={(e) => handleValueChange(e, 'حساب_بانکی')}
                      validationMessagePosition="buttom"
                      inputAttr={phoneLabel}
                    >
                      <Validator>
                        <RequiredRule message='وارد نمودن حساب بانکی الزامی است' />
                      </Validator>
                    </TextBox>
                  </SimpleItem>
                  <SimpleItem dataField="شعبه بانکی" />
                  <SimpleItem dataField="شماره شبا"  editorType="dxNumberBox" editorOptions={{ format: "#" }}  >
                    <TextBox
                      value={formData.شماره_شبا} // مقدار فیلد
                      onValueChanged={(e) => handleValueChange(e, 'شماره_شبا')}
                      validationMessagePosition="top"
                      inputAttr={phoneLabel}
                    >
                      <Validator>
                        <RequiredRule message='وارد نمودن شماره شبا الزامی می باشد' />
                      </Validator>
                    </TextBox>
                  </SimpleItem>
                </Tab>
                <Tab title="بیمه">
                  <SimpleItem dataField="شعبه بیمه" />
                </Tab>
              </TabbedItem>
            </GroupItem>


            <GroupItem
              captionRender={groupCaptionNamedRender('user')}
              caption="اطلاعات تکمیلی"
            >

              <TabPanelOptions deferRendering={false} />

              <SimpleItem dataField="حساب بانکی" />


            </GroupItem>

          </GroupItem>
        </Form>
        <div className="dx-field-value">
          <Button
            onClick={validateClick}
            id="button"
            text="ثبت اطلاعات"
            type="default"
          />
        </div>
      </div>
    </React.Fragment>
  );
}

