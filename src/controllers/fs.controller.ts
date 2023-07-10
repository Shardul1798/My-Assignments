import fs from "fs";

class fsController {

  //Method to upload file using post
  uploadFile(req, res) {
    try {
      return res.status(200).json({ message: "Successfully Updated;" });
    } catch (error) {
      return res.status(400).json({ message: "Something is wrong!" });
    }
  }

  //Method to create a new file with old file contents
  async mergeAndCreateFile(req, res) {
    try {
      const { filePathOne, filePathTwo } = req.body;
      //reading file one
      fs.readFile(filePathOne, "utf8", (err, dataFile1) => {
        if (err) {
          console.error(err);
          throw err;
        }
        fs.readFile(filePathTwo, "utf8", (err, dataFile2) => {
          if (err) {
            console.error(err);
          }
          const contentFileThree = dataFile1 + dataFile2;
          const fileName = `${Date.now()}-file3.txt`
          const newFilePath = `src/public/backup/${fileName}`;
          fs.writeFile(
            newFilePath,
            contentFileThree,
            (err) => {
              if (err) {
                console.log(err);
                return res.status(500).json({ error: err });
              }
              return res
                .status(200)
                .json({ message: "Created File three Successfully!" });
            }
          );
        });
      });
    } catch (error) {
      return res.status(400).json({ message: "Something is wrong!" });
    }
  }
}

export const fscontroller = new fsController();
