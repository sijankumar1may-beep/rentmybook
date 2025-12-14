import { NextApiRequest, NextApiResponse } from "next";

const hander = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      console.log(req.body);
    //   await fetch("https://85f868f84b4b752cd01911617b0ee3fb.m.pipedream.net", {
    //     method: "GET",
    //     body: JSON.stringify(req.body),
    //   });
      res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(404).json({ message: "Error" });
    }
    // const usersData=new ContactUs(req.body)
    //   await usersData.save()
    
  } else {
    res.status(405).json({ message: "Method is not correct" });
  }
};

export default hander;
