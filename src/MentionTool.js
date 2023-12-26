export default class MentionTool {
  static title = "Mentions";

  static get isInline() {
    return true;
  }

  constructor({ api, config }) {
    this.api = api;
    this.button = null;
    this.state = false;
    this.users = config.users;
    this.actionList = null;
    this.selectedUser = null;
    this.range = null;
    this.block = null;
  }

  static get sanitize() {
    return {
      span: true,
    };
  }

  render() {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.textContent = "@";
    this.button.style.border = "none";
    this.button.style.background = "white";
    this.button.style.cursor = "pointer";
    return this.button;
  }

  selectUser(user) {
    this.selectedUser = user;

    const selectedNode = this.range.extractContents();
    const element = document.createElement("span");
    element.id = this.selectedUser.id;
    element.style.color = "white";
    element.style.padding = "7px";
    element.style.borderRadius = "20px";
    element.style.backgroundColor = "#24A0ED";
    element.contentEditable = false;

    selectedNode.textContent = "@" + this.selectedUser.name;
    element.appendChild(selectedNode);

    this.range.insertNode(element);
    this.api.selection.expandToTag(element);
    this.actionList.hidden = true;
    this.api.inlineToolbar.close();
    const s = window.getSelection();
    s.removeAllRanges();
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

    this.users.forEach((user) => {
      const listItem = document.createElement("li");
      listItem.style.cursor = "pointer";
      listItem.style.display = "flex";
      listItem.style.marginBottom = "5px";
      listItem.style.verticalAlign = "center";
      listItem.style.alignItems = "center";
      listItem.style.justifyContent = "start";

      const img = document.createElement("img");
      img.src = user.profile_photo || user.href;
      img.style.width = "30px";
      img.style.height = "30px";
      img.style.marginRight = "10px";
      img.style.borderRadius = "50%";

      listItem.style.userSelect = "none";

      const text = document.createTextNode(user.name);

      listItem.appendChild(img);
      listItem.appendChild(text);
      listItem.addEventListener("click", () => {
        this.selectUser(user);
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
      this.block = this.api.blocks.getCurrentBlockIndex();
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
    this.state = !!anchorElement.closest("span");
  }
}
