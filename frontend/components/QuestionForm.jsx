import { useState, useRef } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import api from '../utils/api';
import styles from '../styles/QuestionForm.module.css';

const QuestionForm = ({ questions }) => {
  const [qaDict, setQaDict] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [report, setReport] = useState(null);
  const [feedback, setFeedback] = useState('');
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setQaDict({ ...qaDict, [questions[currentIndex]]: e.target.value });
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const handleGenerate = async () => {
    if (Object.keys(qaDict).length === questions.length) {
      try {
        console.log('Attempting to generate report with data:', qaDict);
        const response = await api.post('/generate_report/', { qa_dict: qaDict });
        console.log('Received response:', response);
        setReport(response.data.report);
      } catch (error) {
        console.error('Detailed Error:', error);
        if (error.response) {
          alert(`Server responded with error: ${error.response.status} - ${error.response.data}`);
        } else if (error.request) {
          alert('No response received from server. Check if the backend is running.');
        } else {
          alert(`Error setting up the request: ${error.message}`);
        }
      }
    }
  };

  const handleRefineReport = async () => {
    try {
      const response = await api.post('/refine_report/', {
        current_report: report,
        feedback: feedback,
        questions: Object.keys(qaDict),
        responses: Object.values(qaDict),
      });
      setReport(response.data.refined_report);
      setFeedback(''); // Clear feedback after refinement
    } catch (error) {
      console.error('Report refinement error:', error);
      alert('Failed to refine report');
    }
  };

  const handleDownloadReport = async (format) => {
    try {
      const response = await api.post(
        '/download_report/',
        {
          report: report,
          format: format,
        },
        {
          responseType: 'blob',
        }
      );

      // Create a blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Report download error:', error);
      alert('Failed to download report');
    }
  };

  const containerStyle = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: config.slow,
  });

  const itemStyle = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    delay: 200,
    config: config.slow,
  });

  return (
    <animated.div style={containerStyle} className={`${styles.formContainer} space-y-4`}>
      <animated.h3 style={itemStyle} className="text-2xl font-bold text-blue-800 mb-4">
        {questions[currentIndex]}
      </animated.h3>

      <animated.textarea
        style={itemStyle}
        ref={textareaRef}
        className="w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 transition-all duration-300"
        rows="5"
        value={qaDict[questions[currentIndex]] || ''}
        onChange={handleChange}
      />

      <animated.div style={itemStyle} className="flex justify-between space-x-4">
        {currentIndex > 0 && (
          <animated.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            className={`${styles.btn} flex-1`}
          >
            Previous
          </animated.button>
        )}

        {currentIndex < questions.length - 1 && (
          <animated.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className={`${styles.btn} flex-1`}
          >
            Next
          </animated.button>
        )}

        {currentIndex === questions.length - 1 && (
          <animated.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerate}
            className={`${styles['btn-primary']} flex-1`}
          >
            Generate Report
          </animated.button>
        )}
      </animated.div>

      {report && (
        <animated.div
          style={itemStyle}
          className="mt-4 bg-white p-4 rounded-lg shadow-md"
        >
          <h4 className="text-xl font-semibold text-blue-700 mb-2">Generated Report</h4>
          <pre className="bg-gray-50 p-3 rounded-lg overflow-auto max-h-64">{report}</pre>

          <animated.textarea
            style={itemStyle}
            className="w-full mt-4 p-3 border-2 border-green-200 rounded-lg"
            placeholder="Enter feedback to refine the report..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="3"
          />

          <animated.div style={itemStyle} className="flex space-x-4 mt-4">
            <animated.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefineReport}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Refine Report
            </animated.button>

            <animated.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDownloadReport('docx')}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Download DOCX
            </animated.button>
          </animated.div>
        </animated.div>
      )}
    </animated.div>
  );
};

export default QuestionForm;
