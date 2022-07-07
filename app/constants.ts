const Embed = require('@editorjs/embed')
const Table = require('@editorjs/table')
const List = require('@editorjs/list')
const Warning = require('@editorjs/warning')
const Code = require('@editorjs/code')
const LinkTool = require('@editorjs/link')
const Image = require('@editorjs/image')
const Raw = require('@editorjs/raw')
const Header = require('@editorjs/header')
const Quote = require('@editorjs/quote')
const Marker = require('@editorjs/marker')
const CheckList = require('@editorjs/checklist')
const Delimiter = require('@editorjs/delimiter')
const InlineCode = require('@editorjs/inline-code')
const SimpleImage = require('@editorjs/simple-image')
const TextVariantTune = require('@editorjs/text-variant-tune')

export const EDITOR_JS_TOOLS = {
  header: {
    class: Header,
    inlineToolbar : true
  },
  embed: Embed,
  table: Table,
  marker: Marker,
  list: {
    class: List,
    inlineToolbar: true
  },
  warning: Warning,
  code: Code,
  linkTool: {
    class: LinkTool,
    inlineToolbar: true,
    config: {
      endpoint: 'http://localhost:3000', // Your backend endpoint for url data fetching,
    }
  },
  image: Image,
  //image: {
    //     class: Image,
    //     config: {
    //       uploader: {
    //         async uploadByFile(file: any) {
    //           const responseFromAWS = await axios({
    //             method: 'post',
    //             url: '/.netlify/functions/uploadImage',
    //             data: file.name,
    //           });
    //           console.log(responseFromAWS.data.url);
    //           console.log('ATTEMPTING PUT');
    //           const putResponse = await fetch(responseFromAWS.data.url, {
    //             method: 'PUT',
    //             headers: {
    //               'Content-Type': 'multipart/form-data',
    //             },
    //             body: file,
    //           });
    //           const imageUrl = putResponse.url.split('?')[0];
    //           return {
    //             success: 1,
    //             file: {
    //               url: imageUrl,
    //             },
    //           };
    //         },
    //         uploadByUrl(url: any) {
    //           return {
    //             success: 1,
    //             file: {
    //               url: url,
    //             },
    //           };
    //         },
    //       },
    //     },
    //   },
    
  raw: Raw,
  
  quote: Quote,
  checklist: {
    class: CheckList,
    inlineToolbar : true
  },
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
  textVariant: TextVariantTune,
  paragraph: { // apply only for the 'paragraph' tool
    tunes: ['textVariant'],
  }
}
