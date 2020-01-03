/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import BlockToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import Title from '@ckeditor/ckeditor5-heading/src/title';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import ImageLink from './plugins/ImageLink';
import ImageViaUrlEmbed from './packages/imageviaurlembed/src/imageviaurlembed';

import '../theme/custom.css';
import '../theme/theme.css';

export default class BalloonEditor extends BalloonEditorBase {}

// Plugins to include in the build.
BalloonEditor.builtinPlugins = [
  Essentials,
  UploadAdapter,
  Autoformat,
  BlockToolbar,
  Bold,
  Italic,
  BlockQuote,
  CKFinder,
  CodeBlock,
  EasyImage,
  Heading,
  HorizontalLine,
  Image,
  ImageCaption,
  ImageLink,
  ImageViaUrlEmbed,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  Table,
  TableToolbar,
  Title,
  TodoList
];

// Editor configuration.
BalloonEditor.defaultConfig = {
  blockToolbar: [
    'bulletedList',
    'numberedList',
    'todoList',
    '|',
    'imageUpload',
    'imageViaUrlEmbed',
    'insertTable',
    'mediaEmbed',
    'CodeBlock',
    'link',
    'HorizontalLine'
  ],
  toolbar: {
    items: [
      'heading',
      '|',
      'indent',
      'outdent',
      '|',
      'bold',
      'italic',
      'blockQuote'
    ]
  },
  image: {
    // You need to configure the image toolbar, too, so it uses the new style buttons.
    toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight', 'imageStyle:alignCenter' ],

    styles: [
      // This option is equal to a situation where no style is applied.
      'full',

      // This represents an image aligned to the left.
      'alignLeft',

      // This represents an image aligned to the right.
      'alignRight',

      'alignCenter'
    ]
  },
  table: {
    contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: 'zh-cn',
  placeholder: '请输入内容',
  indentBlock: {
    offset: 1,
    unit: 'em'
  },
  link: {
    decorators: {
      addTargetToExternalLinks: {
        mode: 'automatic',
        callback: url => /^(https?:)?\/\//.test(url),
        attributes: {
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      }
    }
  },
  title: {
    placeholder: '文章标题'
  },
  codeBlock: {
    languages: [
      { language: 'javascript', label: 'JavaScript' },
      { language: 'plaintext', label: 'Plain text' },
      { language: 'c', label: 'C' },
      { language: 'cs', label: 'C#' },
      { language: 'cpp', label: 'C++' },
      { language: 'css', label: 'CSS' },
      { language: 'diff', label: 'Diff' },
      { language: 'xml', label: 'HTML/XML' },
      { language: 'java', label: 'Java' },
      { language: 'php', label: 'PHP' },
      { language: 'python', label: 'Python' },
      { language: 'ruby', label: 'Ruby' },
      { language: 'typescript', label: 'TypeScript' },
    ]
  },
  mediaEmbed: {
    previewsInData: true
  }
};
