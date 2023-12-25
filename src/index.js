import EditorJS from '@editorjs/editorjs';
/**
 * Block Tools for the Editor
 */
import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import Checklist from '@editorjs/checklist';
import RawTool from '@editorjs/raw';
import Embed from '@editorjs/embed'; 

/** 
 * Inline Tools for the Editor
 */
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
    
          /**
           * Inline Tools
           */
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
          }
        },
        data: {
          blocks: [
            {
              type: 'header',
              data: {
                text: '',
                level: 2,
              },
            },
          ],
        },
        /**
        *  onReady callback
        */
        onReady: () => {console.log('Editor.js is ready to work!')},
  });
});