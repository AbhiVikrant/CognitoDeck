import Counter from "./component/Counter"
import Modal from "./component/Modal";
function App()
{
  const faqData = [
    {
      question: "What is React?",
      answer:
        "React is a JavaScript library used for building fast and interactive user interfaces.",
    },
    {
      question: "What is useState?",
      answer:
        "useState is a React Hook that lets you add state to functional components.",
    },
    {
      question: "What is JSX?",
      answer:
        "JSX is a syntax extension for JavaScript that looks similar to HTML and is used with React to describe the UI.",
    },
  ];
  return(
   <>
    <Counter/>
    <Modal faqs={faqData}/>
   </>
  )
}
export default App;