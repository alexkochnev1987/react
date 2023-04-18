import * as uuid from "uuid";
import * as path from "path";

class FileService {
  async saveFile(file) {
    try {
      const fileName = uuid.v4() + ".pdf";
      const filePath = path.resolve("static", fileName);
      file.mv(filePath);
      return fileName;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new FileService();