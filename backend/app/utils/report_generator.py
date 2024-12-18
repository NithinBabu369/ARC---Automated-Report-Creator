import os
from groq import Groq
from dotenv import load_dotenv
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph,Spacer
from reportlab.lib.styles import getSampleStyleSheet
from docx import Document
from docx.shared import Pt

# Load the .env file
load_dotenv()

def response_generator(questions, responses, matching_docs):
    client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

    qa_with_docs = [
        f"Q: {q}\nA: {a}\nSupporting Document: {d}"
        for q, a, d in zip(questions, responses, matching_docs)
    ]
    qa_content_with_docs = "\n\n".join(qa_with_docs)

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": """

## TEMPLATE for Business Report Generation
##STARTING WITH: 
# TITLE of The Business
# TABLE OF CONTENTS
- Executive Summary
- Company Overview
- Industry and Market Analysis
- Competitive Analysis
- Product Portfolio
- Marketing and Sales Strategy
- Operations and Technology Infrastructure
- Financial Plan
- Risk Assessment
- Economic and Social Impact
- Appendix


### Core Instructions
- Generate a comprehensive business report
- CRITICAL RULE: If specific data for any section is not provided, populate content using general knowledge
- NO COMMENTARY OR EXPLANATORY TEXT OUTSIDE THE REPORT CONTENT
- Maintain professional, data-driven approach
- Ensure logical flow and coherence across all sections
- SHOULD NOT GENERATE ANY UNWANTED TEXT LIKE : Note: The above report is generated based on the provided context and does not include any fictional specifics.
- ALL FINANCIAL DETAILS SHOULD BE IN USD
### Detailed Section Generation Guidelines

#### 1. Executive Summary
- Synthesize key insights from all report sections
- Highlight strategic implications
- Use clear, concise language
- MINIMUM 100 WORDS

#### 2. Company Overview
- Create hypothetical company profile if no specific details provided
- Include:
  - Fictional company name
  - Industry sector
  - Founding year
  - Organizational structure
  - Leadership overview
  - MINIMUM 100 WORDS

#### 3. Industry and Market Analysis
- Utilize generalized market research data
- Cover:
  - Market size estimates
  - Growth projections
  - Key industry trends
  - Technological landscape
  - Regulatory environment
  - MINIMUM 100 WORDS

#### 4. Competitive Analysis
- Develop comparative analysis using industry archetypes
- Include:
  - Market positioning
  - Competitive strengths/weaknesses
  - Benchmark against industry standards
  - MINIMUM 100 WORDS

#### 5. Product Portfolio
- Generate comprehensive product/service description
- Detail:
  - Product categories
  - Unique value propositions
  - Market potential
  - Development roadmap
  - MINIMUM 100 WORDS

#### 6. Marketing and Sales Strategy
- Construct strategic marketing framework
- Address:
  - Target market segmentation
  - Customer acquisition strategies
  - Sales channel optimization
  - Digital marketing approaches
  - MINIMUM 100 WORDS

#### 7. Operations and Technology Infrastructure
- Design operational model
- Include:
  - Technological capabilities
  - Operational workflows
  - Efficiency metrics
  - Infrastructure investment strategies
  - MINIMUM 100 WORDS

#### 8. Financial Plan
- Develop financial projection model
- Cover:
  - Revenue streams
  - Cost structures
  - Investment requirements
  - Financial performance indicators
  - Risk-adjusted financial scenarios
  - MINIMUM 100 WORDS

#### 9. Risk Assessment
- Comprehensive risk evaluation
- Analyze:
  - Strategic risks
  - Operational vulnerabilities
  - Financial uncertainties
  - Mitigation strategies
  - MINIMUM 100 WORDS

#### 10. Economic and Social Impact
- Articulate broader organizational contributions
- Highlight:
  - Economic value creation
  - Sustainability initiatives
  - Community engagement
  - Social responsibility frameworks
  - MINIMUM 100 WORDS

#### 11. Appendix
- Compile supporting documentation
- Include:
  - Supplementary data tables
  - Research methodologies
  - Detailed financial models
  - Glossary of industry terms

### Execution Protocol
- Use general knowledge intelligently
- Maintain professional, credible narrative
- Ensure logical coherence
- Avoid fictional specifics where possible
- Focus on representative, realistic scenarios . 
 """
            },

        {
            "role": "user",
            "content": f"GENERATE THE BUSINESS REPORT MENTIONED IN THE SYSTEM PROMPT WITH THIS CONTEXT: #{qa_content_with_docs} ELABORATE MORE ON THE GIVEN CONTEXT KEEPING THE SYSTEM PROMPT"
        }],
        model="llama-3.3-70b-versatile",
    )

    return chat_completion.choices[0].message.content


def structure_content(content: str) -> list:

    # Split content into paragraphs, removing extra whitespace
    paragraphs = [p.strip() for p in content.split('\n\n') if p.strip()]
    
    # Handle case of empty or single paragraph
    if not paragraphs:
        paragraphs = [content]
    
    return paragraphs

def generate_pdf(report_content: str) -> str:

    output_dir = 'reports'
    os.makedirs(output_dir, exist_ok=True)
    file_path = os.path.join(output_dir, 'report.docx')
    
    # Create PDF document
    doc = SimpleDocTemplate(file_path, pagesize=letter)
    
    # Get styles
    styles = getSampleStyleSheet()
    story = []
    
    # Process paragraphs
    paragraphs = structure_content(report_content)
    
    for para in paragraphs:
        # Add paragraph with normal style
        p = Paragraph(para, styles['Normal'])
        story.append(p)
        
        # Add some space between paragraphs
        story.append(Spacer(1, 12))
    
    # Build PDF
    doc.build(story)
    
    return file_path

def generate_docx(report_content: str) -> str:

    output_dir = 'reports'
    os.makedirs(output_dir, exist_ok=True)
    file_path = os.path.join(output_dir, 'report.docx')
    
    # Create new document
    doc = Document()
    
    # Process paragraphs
    paragraphs = structure_content(report_content)
    
    for para in paragraphs:
        # Add paragraph with standard formatting
        paragraph = doc.add_paragraph(para)
        
        # Optional: Customize paragraph style if needed
        for run in paragraph.runs:
            run.font.name = 'Calibri'
            run.font.size = Pt(11)
    
    # Save document
    doc.save(file_path)
    
    return file_path