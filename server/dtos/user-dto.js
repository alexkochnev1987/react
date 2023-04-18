export class UserDTO {
  id;
  isActivated;
  email;
  constructor(model) {
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.email = model.email;
    this.username = model.username;
  }
}
