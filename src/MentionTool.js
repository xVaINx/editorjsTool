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
    this.displayUserList = false;
  }

  static get sanitize() {
    return {
      span: true,
    };
  }

  render() {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.textContent = "M";
    this.button.style.width = "20px";
    this.button.style.height = "20px";
    this.button.style.margin = "auto";
    this.button.style.display = "flex";
    this.button.style.justifyContent = "center";
    this.button.style.alignItems = "center";
    this.button.style.background = "white";
    this.button.style.border = "none";

    return this.button;
  }

  renderActions() {
      this.actionList = document.createElement("ul");
      this.actionList.style.position = "absolute";
      this.actionList.style.background = "#fff";
      this.actionList.style.border = "1px solid #ddd";
      this.actionList.style.padding = "5px";
      this.actionList.style.maxHeight = "150px";
      this.actionList.style.overflowY = "auto";
      this.actionList.style.width = "185px";
      this.actionList.style.borderRadius = "10px";
      this.actionList.hidden = true;

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

        const text = document.createTextNode(user.name);

        listItem.appendChild(img);
        listItem.appendChild(text);
        listItem.addEventListener("click", () => {
          this.selectedUser = user;
        //   this.surround();
        });

        this.actionList.appendChild(listItem);
      });
      return this.actionList;
  }

  surround(range) {
    if(this.selectedUser){
        this.wrap(range);
        return;
    }

    // if (!range || this.state) {
    //   return;
    // }


    if (this.displayUserList) {
      this.displayUserList = false;
      this.button.style.color = "black";
      this.actionList.hidden = true;
    } else {
        this.displayUserList = true;
        this.button.style.color = "#0275d8";
        this.actionList.hidden = false;
    }
  }

//   wrap(range) {
//     console.log("called");
//     const selectedText = document.createTextNode('@'+this.selectedUser.name);
//     this.displayUserList = false;
//     this.selectedUser = null;

//     const mark = document.createElement("span");
//     mark.style.backgroundColor = "#0275d8";
//     mark.style.padding = "5px";
//     mark.style.borderRadius = "15px";

//     mark.appendChild(selectedText);
//     range.insertNode(mark);

//     this.api.selection.expandToTag(mark);
//   }

  checkState(selection) {
    const text = selection.anchorNode;
    if (!text) {
      return;
    }
    const anchorElement = text instanceof Element ? text : text.parentElement;
    this.state = !!anchorElement.closest("span");
  }
}
