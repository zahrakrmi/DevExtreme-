import React from 'react';
import FileUploader from 'devextreme-react/file-uploader';
import { locale, loadMessages } from 'devextreme/localization';
import faMessages from 'devextreme/localization/messages/fa.json';

const fileExtensions = ['.jpg', '.jpeg', '.gif', '.png', '.pdf'];

// بارگذاری پیام‌های فارسی
loadMessages(faMessages);
locale('fa');

export default function Upload() {
  return (
    <div className="main-block">
      <div className="file-uploader-block" style={{ float: 'right' }}>
        <FileUploader
          multiple={true}
          uploadUrl="https://js.devexpress.com/Demos/NetCore/FileUploader/Upload"
          uploadMode="useButtons"
          allowedFileExtensions={fileExtensions}
          selectButtonText="انتخاب فایل"
          uploadButtonText="آپلود فایل‌ها"
          labelText="لطفاً فایل‌های خود را آپلود کنید"
          dropZoneText="فایل‌ها را اینجا بکشید"
        />
        <span className="note">
          {'فایل‌های مجاز: '}
          <span >.jpg, .jpeg, .gif, .png, .pdf</span>.
        </span>
      </div>
    </div>
  );
}
