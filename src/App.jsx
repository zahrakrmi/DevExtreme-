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
import service from './data.jsx';
import Button from 'devextreme-react/button';
import Globalize from "globalize";
import faCldr from "cldr-data/main/fa/ca-gregorian.json";
import numbersFa from "cldr-data/main/fa/numbers.json";
import timeZoneData from "cldr-data/supplemental/timeData.json";
import likelySubtags from "cldr-data/supplemental/likelySubtags.json";
import LabelTemplate from './LabelTemplate.jsx';
import LabelNotesTemplate from './LabelNotesTemplate.jsx';
import ValidationSummary from 'devextreme-react/validation-summary';
import {
  Validator,
  RequiredRule,
  CompareRule,
  EmailRule,
  PatternRule,
  StringLengthRule,
  RangeRule,
  AsyncRule,
  CustomRule,
} from 'devextreme-react/validator';
import {
  addressLabel,
  emailLabel,
  nameLabel,
  lastnameLabel,
  codeLabel,
  phoneLabel
} from './data.jsx';

import { loadMessages } from "devextreme/localization";
import Upload from './Upload.jsx';

import { locale } from "devextreme/localization";
locale("fa");
import "devextreme/dist/css/dx.light.css";



Globalize.load(faCldr, numbersFa, timeZoneData, likelySubtags);
Globalize.locale("fa");


// فعال‌سازی راست‌چین
const rtlEnabled = true;

// به عنوان مثال:
<Form
  rtlEnabled={rtlEnabled}
/>;



// تنظیم زبان
locale("fa");

const employee = service.getEmployee();
const validationRules = {
  position: [{ type: 'required', message: 'Position is required.' }],
  hireDate: [{ type: 'required', message: 'Hire Date is required.' }],
  required: [{ type: "required", message: "این فیلد الزامی است." }],

};
const initialData = {
  نام: "",
  نام_خانوادگی: "",
  کد_ملی: "",
  شماره_اقتصادی: "",
  شماره_همراه: "",
  حساب_بانکی: "",
  آدرس_ایمیل: "",
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

const registerButtonOptions = {
  text: 'ثبت اطلاعات',
  type: 'default',
  useSubmitBehavior: true,
  validationGroup: 'registrationGroup',
  width: '120px',
};


const asyncValidation = (params) => sendRequest(params.value);

const editorOptions = { items: service.getPositions(), searchEnabled: true, value: '' };
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

  const [formData, setFormData] = useState(initialData);
  const handleRegister = () => {
    const result = DevExpress.validationEngine.validateGroup("registrationGroup");

    if (result.isValid) {
      // فرم معتبر است
      alert("فرم با موفقیت ارسال شد!");
    } else {
      // نمایش خطاها توسط DevExtreme مدیریت می‌شود
      console.log("خطاهای فرم:", result.brokenRules);
    }
  };
  return (
    <React.Fragment>
      <div className="long-title">
        <h3>اطلاعات اصلی</h3>
      </div>
      <div className="form-container">
        <Form
          colCount={2}
          id="form"
          formData={employee}
          validationGroup="registrationGroup"
        >
          <GroupItem
            captionRender={groupCaptionNamedRender('user')}
            caption="اطلاعات شخصی"
          >
            <TabbedItem>
              <TabPanelOptions deferRendering={false} />
              <Tab title="اطلاعات اولیه">
                <SimpleItem dataField="نام " editorType="dxTextBox" validationRules={validationRules.position} >
                  <TextBox
                    validationMessagePosition="left"
                    inputAttr={nameLabel}
                  >
                    <Validator>
                      <RequiredRule message="name is required" />
                    </Validator>
                  </TextBox>
                </SimpleItem>
                <SimpleItem dataField=" نام خانوادگی" editorType="dxTextBox" validationRules={validationRules.position} >
                  <TextBox
                    validationMessagePosition="buttom"
                    inputAttr={lastnameLabel}
                  >
                    <Validator>
                      <RequiredRule message="lastname is required" />
                    </Validator>
                  </TextBox>
                </SimpleItem>
                <SimpleItem dataField="کد ملی" editorType="dxTextBox" validationRules={validationRules.position} >
                  <TextBox
                    validationMessagePosition="buttom"
                    inputAttr={codeLabel}
                  >
                    <Validator>
                      <RequiredRule message=" کد ملی را وارد نمایید" />
                    </Validator>
                  </TextBox>
                </SimpleItem>
                <SimpleItem dataField="شماره شناسنامه" />
                <SimpleItem dataField="تاریخ تولد" editorType="dxDateBox" editorOptions={hireDateEditorOptions} />
                <SimpleItem dataField="محل صدور" />
                <SimpleItem dataField="شماره اقتصادی (جواز)" editorType="dxNumberBox" editorOptions={{ format: "#" }} validationRules={validationRules.position} >
                  <TextBox
                    validationMessagePosition="top"
                    inputAttr={phoneLabel}
                  >
                    <Validator>
                      <RequiredRule message='شماره اقتصادی را وارد نمایید' />
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
                        { english: 'USA', persian: 'افغانستان' },
                        { english: 'USA', persian: 'آلمان' },
                        { english: 'USA', persian: 'مالزی' },
                        { english: 'USA', persian: 'هندوستان' },
                        { english: 'USA', persian: 'ارمنستان' },
                        { english: 'USA', persian: 'فرانسه' },
                        { english: 'USA', persian: 'کانادا' },
                        { english: 'USA', persian: 'دانمارک' },
                        { english: 'USA', persian: 'اسپانیا' },
                        { english: 'USA', persian: 'ترکیه' },
                      ],
                      valueExpr: 'english',
                      displayExpr: 'persian'
                    }}
                    validationRules={validationRules.position}
                  >
                    <Label render={LabelTemplate('info')} />
                  </SimpleItem>
                  <SimpleItem dataField="استان" validationRules={validationRules.position} editorType="dxSelectBox"  editorOptions={{
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
                    }}/>
                  <SimpleItem dataField="شهر" validationRules={validationRules.position} />
                  <SimpleItem dataField="کدپستی" editorType="dxNumberBox"
                    editorOptions={{
                      format: "#"
                    }} />
                  <SimpleItem dataField="آدرس " editorType="dxTextBox" validationRules={validationRules.position} >
                    <TextBox
                      validationMessagePosition="left"
                      inputAttr={addressLabel}
                    >
                      <Validator>
                        <RequiredRule message="Address is required" />
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
                    validationMessagePosition="buttom"
                    inputAttr={phoneLabel}
                  >
                    <Validator>
                      <RequiredRule message="شماره همراه را وارد نمایید" />
                    </Validator>
                  </TextBox>
                </SimpleItem>
                <SimpleItem dataField="تلفن ثابت" />
                <SimpleItem dataField="آدرس ایمیل" editorType="dxTextBox" validationRules={validationRules.position} >
                  <TextBox inputAttr={emailLabel}   validationMessagePosition="top">
                    <Validator  >
                      <RequiredRule message="Email is required" validationMessagePosition="top"/>
                      <EmailRule message="Email is invalid" />
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
                    <SimpleItem dataField="حساب بانکی" validationRules={validationRules.position} editorType="dxNumberBox" editorOptions={{ format: "#" }}  >
                  <TextBox
                    validationMessagePosition="buttom"
                    inputAttr={phoneLabel}
                  >
                    <Validator>
                      <RequiredRule message='حساب بانکی وارد نمایید' />
                    </Validator>
                  </TextBox>
                </SimpleItem>
                  <SimpleItem dataField="شعبه بانکی" />
                  {/* <SimpleItem dataField="شماره شبا" validationRules={validationRules.position} /> */}
                  <SimpleItem dataField="شماره شبا" validationRules={validationRules.position} editorType="dxNumberBox" editorOptions={{ format: "#" }}  >
                  <TextBox
                    validationMessagePosition="top"
                    inputAttr={phoneLabel}
                  >
                    <Validator>
                      <RequiredRule message='شماره شبا را وارد نمایید' />
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
            width="120px"
            id="button"
            text="Register"
            type="default"
            useSubmitBehavior={true}
          />
        </div>
        <ValidationSummary id="summary" />
      </div>
    </React.Fragment>
  );
}

