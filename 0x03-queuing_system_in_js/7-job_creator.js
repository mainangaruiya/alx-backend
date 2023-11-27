import { createQueue } from 'kue';

const jobs = [
  { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
  { phoneNumber: '4153518781', message: 'This is the code 4562 to verify your account' },
  // ... (other jobs)
];

const queue = createQueue();

jobs.forEach((myJob) => {
  // Create a job and save it to the queue
  const job = queue.create('push_notification_code_2', myJob).save((error) => {
    // Log success or error for job creation
    if (!error) {
      console.log(`Notification job created: ${job.id}`);
    } else {
      console.error(`Error creating job: ${error}`);
    }
  });

  // Event listeners for the job
  job.on('complete', () => {
    console.log(`Notification job ${job.id} completed`);
  }).on('failed', (error) => {
    console.error(`Notification job ${job.id} failed: ${error}`);
  }).on('progress', (progress, data) => {
    console.log(`Notification job ${job.id} ${progress}% complete`);
  });
});