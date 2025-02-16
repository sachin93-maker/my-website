async function runCode() {
    const code = document.getElementById("code").value;

    if (!code.trim()) {
        alert("Please enter Java code before running.");
        return;
    }

    const response = await fetch("/run-java", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
    });

    const result = await response.json();
    document.getElementById("output").innerText = result.output || result.error;
}

async function downloadPDF() {
    const code = document.getElementById("code").value;
    const output = document.getElementById("output").innerText;

    if (!code.trim() || !output.trim()) {
        alert("Run the code first before generating a PDF.");
        return;
    }

    const response = await fetch("/generate-pdf", {
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
}
 
