import {
    message
} from 'antd'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('Bạn chỉ có thể tải ảnh PNG/JPEG lên!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Dung lượng ảnh phải nhỏ hơn 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

const draggerProps = {
    name: 'image',
    multiple: false,
    listType: 'picture',
    action: 'https://api.imgbb.com/1/upload?expiration=600&key=8c37ca908e1a1a4f5db86e4555a008c2',
    // onChange(info) {
    //     const { status } = info.file;
    //     if (status !== 'uploading') {
    //         // console.log('file', info.file, info.fileList);
    //         console.log('Upload xong')
    //         console.log('list upload', info.fileList)

    //         // console.log(info.fileList[0].response.data.display_url)
    //         const urls = info.fileList.map(item => item.response.data.display_url)
    //         console.log(urls)
    //         form.setFieldsValue({
    //             images_product: urls
    //         })
    //     }
    //     if (status === 'done') {
    //         message.success(`${info.file.name} tải lên thành công`);
    //     } else if (status === 'error') {
    //         message.error(`${info.file.name} file upload failed.`);
    //     }
    // },
    // onDrop(e) {
    //     console.log('Dropped files', e.dataTransfer.files);
    // },
};

export {
    getBase64,
    beforeUpload,
    draggerProps
}