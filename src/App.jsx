import React from 'react';
import 'devextreme-react/text-area';
import Form, {
  SimpleItem,
  GroupItem,
  TabbedItem,
  TabPanelOptions,
  Tab,
} from 'devextreme-react/form';
import GroupCaption from './GroupCaption.jsx';
import service from './data.jsx';

import { locale } from "devextreme/localization";
locale("fa");

import Globalize from "globalize";
import faCldr from "cldr-data/main/fa/ca-gregorian.json";
import numbersFa from "cldr-data/main/fa/numbers.json";
import timeZoneData from "cldr-data/supplemental/timeData.json";
import likelySubtags from "cldr-data/supplemental/likelySubtags.json";

Globalize.load(faCldr, numbersFa, timeZoneData, likelySubtags);
Globalize.locale("fa");

import "devextreme/dist/css/dx.light.css";

// فعال‌سازی راست‌چین
const rtlEnabled = true;

// به عنوان مثال:
<Form
  rtlEnabled={rtlEnabled}
/>;


import { loadMessages } from "devextreme/localization";

// اضافه کردن پیام‌های فارسی
loadMessages({
  fa: {
    "Yes": "بله",
    "No": "خیر",
    "Cancel": "لغو",
    "Clear": "پاک کردن",
    "Done": "انجام شد",
    "Loading": "در حال بارگذاری...",
    "Search": "جستجو",
    "Select": "انتخاب کنید",
    "Today": "امروز",
    // پیام‌های بیشتری اضافه کنید...
  },
});

// تنظیم زبان
locale("fa");



const employee = service.getEmployee();
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
        >
          {/* <GroupItem
            captionRender={groupCaptionNamedRender('info')}
            caption="اطلاعات شخصی"
          > */}
          {/* <SimpleItem dataField="کدملی" /> */}
          <GroupItem
            captionRender={groupCaptionNamedRender('user')}
            caption="اطلاعات شخصی"
          >
            <TabbedItem>
              <TabPanelOptions deferRendering={false} />
              <Tab title="اطلاعات اولیه">
                <SimpleItem dataField="نام" />
                <SimpleItem dataField="نام خانوادگی" />
                <SimpleItem dataField="کد ملی" />
              </Tab>
              <Tab title="اطلاعات">
                <SimpleItem dataField="شماره شناسنامه" />
                <SimpleItem dataField="محل صدور" />
                <SimpleItem dataField="شماره اقتصادی (جواز)" />
              </Tab>
              <Tab title="تصویر">
               
              </Tab>
            </TabbedItem>

            <GroupItem
              captionRender={groupCaptionNamedRender('user')}
              caption="اطلاعات حساب"
            >
              <TabbedItem>
                <TabPanelOptions deferRendering={false} />
                <Tab title="حساب">
                  <SimpleItem dataField="حساب بانکی" />
                  <SimpleItem dataField="شعبه بانکی" />
                  <SimpleItem dataField="شماره شبا" />
                </Tab>
                <Tab title="بیمه">
                  <SimpleItem dataField="شعبه بیمه" />
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
              <Tab title="ایمیل">
                <SimpleItem dataField="شماره همراه" />
                <SimpleItem dataField="تلفن ثابت" />
                <SimpleItem dataField="آدرس ایمیل" />
              </Tab>
            </TabbedItem>
            <GroupItem
              captionRender={groupCaptionNamedRender('card')}
              caption="آدرس تکمیلی"
            >
            <TabbedItem>
              <TabPanelOptions deferRendering={false} />
              <Tab title="آدرس">
              <SimpleItem dataField="کشور" />
              <SimpleItem dataField="استان" />
              <SimpleItem dataField="شهر" />
              <SimpleItem dataField="کدپستی" />
              <SimpleItem dataField="آدرس" />
              </Tab>
            </TabbedItem>
            {/* <SimpleItem dataField="BirthDate" /> */}
          
          </GroupItem>
          </GroupItem>

          {/* <GroupItem
            captionRender={groupCaptionNamedRender('tel')}
            caption="Contact Information"
          >
            <TabbedItem>
              <TabPanelOptions deferRendering={false} />
              <Tab title="Phone">
                <SimpleItem dataField="Phone" />
              </Tab>
              <Tab title="Skype">
                <SimpleItem dataField="Skype" />
              </Tab>
              <Tab title="Email">
                <SimpleItem dataField="Email" />
              </Tab>
            </TabbedItem>
          </GroupItem> */}
        </Form>
      </div>
    </React.Fragment>
  );
}