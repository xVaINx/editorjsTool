export default class URLTool {
    static title = "URLs";
  
    static get shortcut() {
      return "CTRL+3";
    }
  
    static get isInline() {
      return true;
    }
  
    constructor({ api, config }) {
      this.api = api;
      this.button = null;
      this.state = false;
      this.links = config.links;
      this.actionList = null;
      this.selectedLink = null;
      this.range = null;
      this.block = null;
      this.iconClasses = {
        base: this.api.styles.inlineToolButton,
        active: this.api.styles.inlineToolButtonActive
      };
    }
  
    static get sanitize() {
      return {
        a: true,
      };
    }
  
    render() {
      this.button = document.createElement("button");
      this.button.type = "button";
      this.button.innerText = "/";
      this.button.classList.add(this.iconClasses.base);
      this.button.style.paddingLeft = "5px";
      this.button.style.paddingLeft = "5px";
      this.button.style.fontWeight = "500";
      this.button.style.display="flex";
      this.button.style.justifyContent="center";
      this.button.style.alignItems="center";
      this.button.tabIndex = 0;
      return this.button;
    }
  
    selectLink(Link) {
      this.selectedLink = Link;
    
      const selectedNode = this.range.extractContents();
      const element = document.createElement("a");
      element.id = this.selectedLink.id;
      element.style.color = "blue";
      element.contentEditable = true;
      element.href = this.selectedLink.href;

      selectedNode.textContent = this.selectedLink.linkName;

      element.appendChild(selectedNode);

      element.addEventListener("click", e => {
        if (e.ctrlKey || e.metaKey) {
          window.open(element.href, '_blank');
          e.preventDefault();
        }
      });

      this.range.insertNode(element);
    
      // Create a new range just after the inserted a element
      const newRange = document.createRange();
      newRange.setStartAfter(element);
      newRange.collapse(true);
    
      // Clear the existing selection
      const selection = window.getSelection();
      selection.removeAllRanges();
    
      // Set the selection to the new range
      selection.addRange(newRange);
    
      // Hide the actionList and close the inlineToolbar
      this.actionList.hidden = true;
      this.api.inlineToolbar.close();
    }
    
  
    renderActions() {
      this.actionList = document.createElement("ul");
      this.actionList.style.position = "absolute";
      this.actionList.style.background = "#fff";
      this.actionList.style.border = "1px solid #ddd";
      this.actionList.style.padding = "5px";
      this.actionList.style.maxHeight = "150px";
      this.actionList.style.overflowY = "auto";
      this.actionList.style.width = "150px";
      this.actionList.style.borderRadius = "10px";
  
      this.links.forEach((linkObj) => {
        const listItem = document.createElement("li");
        listItem.style.cursor = "pointer";
        listItem.style.display = "flex";
        listItem.style.padding = "0px 5px 5px 5px";
        listItem.style.verticalAlign = "center";
        listItem.style.alignItems = "center";
        listItem.style.justifyContent = "start";
  
        listItem.style.userSelect = "none";
  
        const text = document.createTextNode(linkObj.linkName);

        listItem.appendChild(text);
        listItem.addEventListener("click", (e) => {
          this.selectLink(linkObj);
        });
  
        this.actionList.appendChild(listItem);
      });
      this.actionList.hidden = true;
      return this.actionList;
    }
  
    surround(range) {
      if (this.actionList.hidden) {
        this.actionList.hidden = false;
        this.range = range;
        const blockIndex = this.api.blocks.getCurrentBlockIndex();
        this.block = this.api.blocks.getBlockByIndex(blockIndex);
      } else {
        this.actionList.hidden = true;
      }
    }
  
    checkState(selection) {
      const text = selection.anchorNode;
      if (!text) {
        return;
      }
      const anchorElement = text instanceof Element ? text : text.parentElement;
      this.state = !!anchorElement.closest("a");
    }
  }
  