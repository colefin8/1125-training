const pdf = async (currentDate: string, secretsCount: number, playerName: string): Promise<string> => {
    try {
        const response = await fetch('./certificate-template.html');
        let html = await response.text();
        
        html = html.replace('{{DATE}}', currentDate);
        html = html.replace('{{SECRETS_COUNT}}', secretsCount.toString());
        html = html.replace('{{NAME}}', playerName);
        
        return html;
    } catch (error) {
        console.error('Error loading certificate template:', error);
        return `<!DOCTYPE html>
<html>
<head>
  <title>Awardo Frontend Puzzle Master Certificate</title>
  <style>
    @page { size: A4; margin: 20mm; }
    body {
      font-family: 'Georgia', serif;
      text-align: center;
      padding: 40px;
      background: #DDDDDD;
      color: white;
      margin: 0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .certificate {
      background: white;
      color: #333;
      padding: 60px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      max-width: 600px;
      margin: 0 auto;
    }
    .header {
      font-size: 28px;
      font-weight: bold;
      color: #2196F3;
      margin-bottom: 20px;
    }
    .title-image {
      width: 100%;
      max-width: 400px;
      height: auto;
      margin: 30px 0;
    }
    .achievement {
      font-size: 18px;
      margin: 30px 0;
      line-height: 1.6;
    }
    .date {
      font-size: 16px;
      color: #666;
      margin-top: 40px;
    }
    .signature {
      margin-top: 40px;
      border-top: 1px solid #ddd;
      padding-top: 20px;
      font-style: italic;
    }
    .secrets {
      font-size: 12px;
      color: #999;
      margin-top: 20px;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="header">🏆 VERY OFFICIAL AWARDO CERTIFICATION 🏆</div>
    <img src="./certificate-title.svg" alt="Frontend Puzzle Master" class="title-image" />
    <div class="achievement">
      This certifies that the bearer has successfully completed all challenges
      in the Awardo Frontend Puzzle Challenge, demonstrating mastery of:
      <br><br>
      • DOM Inspection & Manipulation<br>
      • CSS Selector Expertise<br>
      • JavaScript Console Proficiency<br>
      • Local Storage Management<br>
      • Event Listener Implementation<br>
    </div>
    <div class="date">Completed on: ${currentDate}</div>
    <div class="signature">
      Awardo Frontend Academy<br>
      <small>Puzzle Challenge Certification Authority</small>
    </div>
    <div class="secrets">
      Verification Secrets: ${secretsCount} collected
    </div>
  </div>
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 1000);
    }
  </script>
</body>
</html>`;
    }
}

export default pdf