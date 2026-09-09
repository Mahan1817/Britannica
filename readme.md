# Installation & Usage

git clone <repository-url>
cd <project-folder>
npm install
npx playwright install
npm install dotenv


Create '.env' in the project root:

BASE_URL=https://dev.hellobritannica.eb.com/login
STUDENT_EMAIL=your_student_email
STUDENT_PASSWORD=your_student_password


Add '.env' to '.gitignore'.

Run the test:

npx playwright test tests/places-in-a-school.spec.ts


Run with headed mode:

npx playwright test tests/places-in-a-school.spec.ts --headed


View the report:

npx playwright show-report

