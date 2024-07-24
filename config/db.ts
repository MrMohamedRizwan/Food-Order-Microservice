const mongoose = require("mongoose");

export const connectToDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB Connected");
	} catch (e) {
		console.error("Error connecting to MongoDB:", e);
		
	}
};
