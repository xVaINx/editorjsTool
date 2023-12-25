import EditorJS from '@editorjs/editorjs';

import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import Checklist from '@editorjs/checklist';
import RawTool from '@editorjs/raw';
import Embed from '@editorjs/embed'; 
import Header from '@editorjs/header';

import InlineCode from '@editorjs/inline-code';
import Marker from '@editorjs/marker';
import MentionTool from './MentionTool.js'

document.addEventListener('DOMContentLoaded', function () {


    const editor = new EditorJS({
        holder: 'editorjs',
        tools: {
          list: {
            class: List,
            inlineToolbar: true,
          },
          
          header: Header,
    
          delimiter: Delimiter,
    
          table: {
            class: Table,
            inlineToolbar: true,
          },
    
          warning: {
            class: Warning,
            inlineToolbar: true,
          },
    
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
            
          inlineCode: {
            class: InlineCode,
            shortcut: 'CMD+SHIFT+C',
          },
    
          marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
          },
    
          raw: RawTool,
    
          embed: Embed,

          mention:{
            class: MentionTool,
            config: {
              users: [
            {
                "profile_photo": "http://placehold.it/300x200",
                "name": "John Doe",
            },
            {
                "href": "http://placehold.it/300x200",
                "name": "Jane Doe",
            },
            {
                "href": "http://placehold.it/300x200",
                "name": "Jaan Doe",
            },
            {
                "href": "http://placehold.it/300x200",
                "name": "Jang Doe",
            },
            {
                "href": "http://placehold.it/300x200",
                "name": "Hand Doe",
            },
        ]
            }
          }
        },           
        onReady: () => {console.log('Editor.js is ready to work!')},
  });
});