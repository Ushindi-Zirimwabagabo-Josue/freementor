import express from 'express';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import adminRoute from './routes/adminRoute';
import mentorRoute from './routes/mentorRoute';
import sessionRoute from './routes/sesionRoute';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/auth/', userRoute);
app.use('/api/v1/user', adminRoute);
app.use('/api/v1/mentors', mentorRoute);
app.use('/api/v1/sessions', sessionRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

export default app;
