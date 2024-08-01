import { useState } from "react";
import { toast } from 'react-hot-toast';
import { executeCode } from "../../api";

const Output = ({ editorRef, language }) => {

  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast.error('An error occurred.', {
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <Box w="50%">
    //   <Text mb={2} fontSize="lg">
    //     Output
    //   </Text>
    //   <Button
    //     variant="outline"
    //     colorScheme="green"
    //     mb={4}
    //     isLoading={isLoading}
    //     onClick={runCode}
    //   >
    //     Run Code
    //   </Button>
    //   <Box
    //     height="75vh"
    //     p={2}
    //     color={isError ? "red.400" : ""}
    //     border="1px solid"
    //     borderRadius={4}
    //     borderColor={isError ? "red.500" : "#333"}
    //   >
    //     {output
    //       ? output.map((line, i) => <Text key={i}>{line}</Text>)
    //       : 'Click "Run Code" to see the output here'}
    //   </Box>
    // </Box>
    <div style={{ width: '50%' }}>
      <h2 style={{ marginBottom: '8px', fontSize: '18px' }}>Output</h2>
      <button
        style={{
          border: '1px solid',
          borderColor: 'green',
          backgroundColor: 'transparent',
          color: 'green',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '16px',
        }}
        disabled={isLoading}
        onClick={runCode}
      >
        {isLoading ? 'Loading...' : 'Run Code'}
      </button>
      <div
        style={{
          height: '75vh',
          padding: '8px',
          color: isError ? 'red' : '',
          border: '1px solid',
          borderRadius: '4px',
          borderColor: isError ? 'red' : '#333',
        }}
      >
        {output
          ? output.map((line, i) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};
export default Output;