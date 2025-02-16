const backendUrl = "https://backend-server-4jl5.onrender.com"; // Replace with your actual Render backend URL

async function runCode() {
    const code = document.getElementById("code").value;

    if (!code.trim()) {
        alert("Please enter some Java code to execute.");
        return;
    }

    try {
        const response = await fetch(`${backendUrl}/run-java`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code })
        });

        const result = await response.json();
        document.getElementById("output").innerText = result.output || result.error;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("output").innerText = "Error executing Java code.";
    }
}

async function downloadPDF() {
    const code = document.getElementById("code").value;
    const output = document.getElementById("output").innerText;

    if (!code.trim() || !output.trim()) {
        alert("Run the code first before generating a PDF.");
        return;
    }

    try {
        const response = await fetch(`${backendUrl}/generate-pdf`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, output })
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "JavaCode.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            alert("Error generating PDF");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error generating PDF.");
    }
}

 
