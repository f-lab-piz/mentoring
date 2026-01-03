from locust import HttpUser, task, between

class MentoringUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def dashboard(self):
        self.client.get("/api/v1/stats")

    @task
    def list_mentees(self):
        self.client.get("/api/v1/mentees")

    @task
    def create_mentee(self):
        self.client.post("/api/v1/mentees", json={"name": "Locust User", "goal": "Load Test"})
