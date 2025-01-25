import React, {
   useState,
} from 'react';
import 'devextreme-react/text-area';
import { TextBox, Button as TextBoxButton } from 'devextreme-react/text-box';
import Form, {
  SimpleItem,
  GroupItem,
  TabbedItem,
  TabPanelOptions,
  Tab,
} from 'devextreme-react/form';
import GroupCaption from './GroupCaption.jsx';
import Button from 'devextreme-react/button';
import Globalize from "globalize";
import faCldr from "cldr-data/main/fa/ca-gregorian.json";
import numbersFa from "cldr-data/main/fa/numbers.json";
import timeZoneData from "cldr-data/supplemental/timeData.json";
import likelySubtags from "cldr-data/supplemental/likelySubtags.json";
import notify from 'devextreme/ui/notify';
import { getEmployee, updateEmployee, simpleProducts, productLabel } from './data.jsx';
import TagBox from 'devextreme-react/tag-box';
import {
  Validator,
  RequiredRule,
  EmailRule,
  AsyncRule,
} from 'devextreme-react/validator';


import Upload from './Upload.jsx';

import { locale } from "devextreme/localization";
import "devextreme/dist/css/dx.light.css";
import { DateBox } from 'devextreme-react/date-box';
import dayjs from 'dayjs';
import jalaliday from 'jalaliday'; 



dayjs.extend(jalaliday);

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
// console.log(employee);



const validationRules = {
  position: [{ type: 'required', message: 'فیلد الزامی می باشد' }],
  hireDate: [{ type: 'required', message: 'Hire Date is required.' }],
  required: [{ type: "required", message: "این فیلد الزامی است." }],

};

const hireDateEditorOptions = { width: '100%', value: null ,displayFormat: (date) => dayjs(date).format('jYYYY/jMM/jDD') };











function sendRequest(value) {
  const invalidEmail = 'test@dx-email.com';
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value !== invalidEmail);
    }, 1000);
  });
}


const asyncValidation = (params) => sendRequest(params.value);
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
  const [formData, setFormData] = useState(getEmployee() || {});

  const handleValueChange = (e, field) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData, [field]: e.value || '' };
      updateEmployee(updatedData); // ذخیره در localStorage
      return updatedData;
    });
  };

  function validateClick({ validationGroup }) {
    console.log("Validation Group: ", validationGroup);
    const result = validationGroup.validate();
    // console.log(result)
    if (result.isValid) {
      updateEmployee(formData); // ذخیره داده‌ها در localStorage
      notify('اطلاعات با موفقیت ثبت گردید.', 'success');
    } else {
      notify('اطلاعات ثبت نشد. لطفا مجدد فیلدهای اجباری را بررسی نمایید', 'error');
    }
  }



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
          validationGroup="employeeForm"
        >
          <GroupItem
            captionRender={groupCaptionNamedRender('user')}
            caption="اطلاعات شخصی"
          >
            <TabbedItem>
              <TabPanelOptions deferRendering={false} />
              <Tab title="اطلاعات اولیه">
       
                <SimpleItem
                  validationRules={validationRules.position}
                  dataField="نام"
                  editorType="dxTextBox"
                  editorOptions={{
                    format: "#",
                    value: formData.نام, // مقدار پیش‌فرض
                    onValueChanged: (e) => handleValueChange(e, 'نام'),
                    // validationRules: [
                    //   { type: 'required', message: 'وارد نمودن شماره اقتصادی(جواز)الزامی می باشد' },
                    // ],
                  }}
                >

                </SimpleItem>

                <SimpleItem
                  validationRules={validationRules.position}
                  dataField="نام خانوادگی"
                  editorType="dxTextBox"
                  editorOptions={{
                    format: "#",
                    value: formData.نام_خانوادگی, // مقدار پیش‌فرض
                    onValueChanged: (e) => handleValueChange(e, 'نام_خانوادگی'),
                    validationRules: [
                      { type: 'required', message: 'وارد نمودن شماره اقتصادی(جواز)الزامی می باشد' },
                    ],
                  }}
                >

                </SimpleItem>
         
                <SimpleItem
                  validationRules={validationRules.position}
                  dataField="کد ملی"
                  editorType="dxNumberBox"
                  editorOptions={{
                    format: "#",
                    value: formData.کد_ملی, // مقدار پیش‌فرض
                    onValueChanged: (e) => handleValueChange(e, 'کد_ملی'),
                    validationRules: [
                      { type: 'required', message: 'وارد نمودن شماره اقتصادی(جواز)الزامی می باشد' },
                    ],
                  }}
                >

                </SimpleItem>
          
                <SimpleItem
                  validationRules={validationRules.position}
                  dataField="زمینه فعالیت"
                  editorType="dxTagBox"
                  editorOptions={{
                    items: simpleProducts,
                    searchEnabled: true,
                    inputAttr: productLabel,
                    placeholder: "  انتخاب کنید...",
              
                  }}
                >

                </SimpleItem>
                <SimpleItem dataField="شماره شناسنامه" editorType="dxNumberBox"
                    editorOptions={{
                      format: "#"
                    }} />
                <SimpleItem dataField="تاریخ تولد" editorType="dxDateBox" editorOptions={hireDateEditorOptions} />
          
                <SimpleItem
                  validationRules={validationRules.position}
                  dataField="شماره اقتصادی "
                  editorType="dxNumberBox"
                  editorOptions={{
                    format: "#",
                    value: formData.شماره_اقتصادی, // مقدار پیش‌فرض
                    onValueChanged: (e) => handleValueChange(e, 'شماره_اقتصادی'),
                    validationRules: [
                      { type: 'required', message: 'وارد نمودن شماره اقتصادی(جواز)الزامی می باشد' },
                    ],
                  }}
                >

                </SimpleItem>

                <SimpleItem dataField="محل صدور" />
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
                  <SimpleItem
                    validationRules={validationRules.position}
                    dataField="کشور"
                    editorType="dxSelectBox"
                    editorOptions={{
                      dataSource: [
                        { english: 'IRAN', persian: 'ایران' },
                        { english: 'USA', persian: 'ایالات متحده امریکا' },
                        { english: 'afganestan', persian: 'افغانستان' },
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
                      displayExpr: 'persian',
                      value: formData.کشور, // مقدار پیش‌فرض
                      onValueChanged: (e) => handleValueChange(e, 'کشور'),
                      validationRules: [
                        { type: 'required', message: 'این فیلد باید پر شود' },
                      ],
                    }}
                  >

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
              
                  <SimpleItem
                    validationRules={validationRules.position}
                    dataField="آدرس"
                    editorType="dxTextBox"
                    editorOptions={{
                      format: "#",
                      value: formData.آدرس, // مقدار پیش‌فرض
                      onValueChanged: (e) => handleValueChange(e, 'آدرس'),
                      validationRules: [
                        { type: 'required', message: 'وارد نمودن شماره اقتصادی(جواز)الزامی می باشد' },
                      ],
                    }}
                  >

                  </SimpleItem>
                  <SimpleItem dataField="کدپستی" editorType="dxNumberBox"
                    editorOptions={{
                      format: "#"
                    }} />
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
         
                <SimpleItem
                  validationRules={validationRules.position}
                  dataField="شماره همراه "
                  editorType="dxNumberBox"
                  editorOptions={{
                    format: "#",
                    value: formData.شماره_همراه,
                    onValueChanged: (e) => handleValueChange(e, 'شماره_همراه'),

                  }}
                >

                </SimpleItem>
                <SimpleItem  dataField="ایمیل" editorType="dxTextBox"  >
                  <TextBox value={formData.ایمیل} 
                    onValueChanged={(e) => handleValueChange(e, 'ایمیل')} validationMessagePosition="top">
                    <Validator  >
                      <RequiredRule message="وارد نمودن ایمیل الزامی می باشد" validationMessagePosition="buttom" />
                      <EmailRule message="فرمت صحیح ایمیل را رعایت بفرمایید" />
                      {/* <AsyncRule
                        message="ایمیل وارد شده وجود دارد"
                        validationCallback={asyncValidation}
                      /> */}
                    </Validator>
                  </TextBox>
                </SimpleItem>

                <SimpleItem dataField="تلفن ثابت" editorType="dxNumberBox"
                    editorOptions={{
                      format: "#"
                    }} />

              </Tab>
            </TabbedItem>

            <GroupItem
              captionRender={groupCaptionNamedRender('user')}
              caption="اطلاعات حساب"
            >
              <TabbedItem>
                <TabPanelOptions deferRendering={false} />
                <Tab title="حساب">
               
                  <SimpleItem
                    validationRules={validationRules.position}
                    dataField="حساب بانکی"
                    editorType="dxNumberBox"
                    editorOptions={{
                      format: "#",
                      value: formData.حساب_بانکی, 
                      onValueChanged: (e) => handleValueChange(e, 'حساب_بانکی'),
                      validationRules: [
                        { type: 'required', message: 'وارد نمودن شماره اقتصادی(جواز)الزامی می باشد' },
                      ],
                    }}
                  >

                  </SimpleItem>
               
                  <SimpleItem
                    validationRules={validationRules.position}
                    dataField="شماره شبا "
                    editorType="dxNumberBox"
                    editorOptions={{
                      format: "#",
                      value: formData.شماره_شبا,
                      onValueChanged: (e) => handleValueChange(e, 'شماره_شبا'),
                      validationRules: [
                        { type: 'required', message: 'وارد نمودن شماره اقتصادی(جواز)الزامی می باشد' },
                      ],
                    }}
                  >

                  </SimpleItem>
                  <SimpleItem dataField="شعبه بانکی" />
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
              <SimpleItem dataField="فیلدساز" />


            </GroupItem>

          </GroupItem>
        </Form>
        <div className="dx-field-value">
          <Button
            onClick={validateClick}
            id="button"
            text="ثبت اطلاعات"
            type="default"
            validationGroup="employeeForm"
          />
        </div>
      </div>
    </React.Fragment>
  );
}

