import readline from "readline";

const askQuestion = (question: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<string>((resolve) =>
    rl.question(question, (ans: string) => {
      rl.close();
      resolve(ans);
    })
  );
};

export const getUrlFromUser = async (): Promise<string> => {
  const question: string =
    "Please specify valid url ( default https://www.google.com ):";
  const answer = await askQuestion(question);

  return answer === "" ? "https://www.google.com" : answer;
};

export const getOptionFromUser = async (): Promise<boolean> => {
  const question: string = "Run in headless mode? (y/n):";
  const isHeadLess = await askQuestion(question);

  if (isHeadLess.toUpperCase() === "Y") return true;
  if (isHeadLess.toUpperCase() === "N") return false;
  else console.error("Invalid option");

  process.exit(128);
};

export const outputResult = (object: Object) => console.log(object);
