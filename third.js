const { jsPDF } = window.jspdf;

document.addEventListener("DOMContentLoaded", function () {
    const downloadBtn = document.getElementById("download-pdf");

    downloadBtn.addEventListener("click", function () {
        const doc = new jsPDF("p", "mm", "a4");
        let cursorY = 20;
        const marginLeft = 10;

        // Fetch input values
        const name = document.getElementById("name").value || "No Name Provided";
        const nickname = document.getElementById("Nickname").value || "-";
        const age = document.getElementById("Age").value || "-";
        const sex = document.getElementById("Sex").value || "-";
        const birthplace = document.getElementById("Birthplace").value || "-";
        const fatherName = document.getElementById("FName").value || "-";
        const motherName = document.getElementById("MName").value || "-";
        const civilStatus = document.getElementById("CStatus").value || "-";
        const nationality = document.getElementById("Nationality").value || "-";
        const religion = document.getElementById("Religion").value || "-";
        const about = document.getElementById("About").value || "No Description Provided";
        const number = document.getElementById("Number").value || "No Number";
        const email = document.getElementById("email").value || "No Email";
        const address = document.getElementById("address").value || "No Address";

        // Character Reference
        const crefName = document.getElementById("CRef_Nmae").value || "-";
        const crefPosition = document.getElementById("Position").value || "-";
        const crefLocation = document.getElementById("RefLocation").value || "-";
        const crefNumber = document.getElementById("RefNumber").value || "-";

        function getDynamicInputs(containerId) {
            return [...document.querySelectorAll(`#${containerId} input`)]
                .map(input => input.value)
                .filter(val => val.trim() !== "");
        }

        const educationList = [...document.querySelectorAll("#education-container .education-entry")].map(entry => {
            return {
                institution: entry.querySelector(".institution").value || "-",
                course: entry.querySelector(".course").value || "-",
                startYear: entry.querySelector(".startYear").value || "-",
                endYear: entry.querySelector(".endYear").value || "-"
            };
        });

        // Title Section
        doc.setFontSize(20).setFont("helvetica", "bold");
        doc.text(name.toUpperCase(), marginLeft, cursorY);
        cursorY += 2;
        doc.setLineWidth(0.5);
        doc.line(marginLeft, cursorY, doc.internal.pageSize.width - marginLeft, cursorY);
        cursorY += 10;

        // Contact Info
        doc.setFontSize(12);
        // Email
        doc.setFont("helvetica", "bold");
        doc.text("Email:", marginLeft, cursorY);
        doc.setFont("helvetica", "normal");
        doc.text(email, marginLeft + 30, cursorY);
        cursorY += 6;
        // Phone
        doc.setFont("helvetica", "bold");
        doc.text("Phone:", marginLeft, cursorY);
        doc.setFont("helvetica", "normal");
        doc.text(number, marginLeft + 30, cursorY);
        cursorY += 6;
        // Address
        doc.setFont("helvetica", "bold");
        doc.text("Address:", marginLeft, cursorY);
        doc.setFont("helvetica", "normal");
        doc.text(address, marginLeft + 30, cursorY);
        cursorY += 5;
        doc.setLineWidth(0.5);
        doc.line(marginLeft, cursorY, doc.internal.pageSize.width - marginLeft, cursorY);
        cursorY += 10;

        // Professional Summary
        doc.setFontSize(20).setFont("helvetica", "bold");
        doc.text("Professional Summary", marginLeft, cursorY);
        cursorY += 6;
        // Set normal text for the paragraph
        doc.setFontSize(12).setFont("helvetica", "normal");
        const textLines = doc.splitTextToSize(about, 170);
        doc.text(textLines, marginLeft, cursorY);
        cursorY += textLines.length * 6
        cursorY += 10;

        // Personal Information
        doc.setFontSize(20).setFont("helvetica", "bold");
        doc.text("Personal Information", marginLeft, cursorY);
        cursorY += 6;
        // Set font sizes for labels (bold) and values (normal)
        doc.setFontSize(12);
        function addBoldLabel(label, value) {
            doc.setFont("helvetica", "bold");
            doc.text(`${label}: `, marginLeft, cursorY);
            let textWidth = doc.getTextWidth(`${label}: `);
            doc.setFont("helvetica", "normal");
            doc.text(value, marginLeft + textWidth, cursorY);
            cursorY += 6;
        }
        // Adding personal information with bold labels
        addBoldLabel("Nickname", nickname);
        addBoldLabel("Age", age);
        addBoldLabel("Sex", sex);
        addBoldLabel("Birthplace", birthplace);
        addBoldLabel("Father's Name", fatherName);
        addBoldLabel("Mother's Name", motherName);
        addBoldLabel("Civil Status", civilStatus);
        addBoldLabel("Nationality", nationality);
        addBoldLabel("Religion", religion);
        cursorY += 2; // Small padding before the line
        doc.setLineWidth(0.5);
        doc.line(marginLeft, cursorY, doc.internal.pageSize.width - marginLeft, cursorY);
        cursorY += 10;

        // Educational Background
        doc.setFontSize(14).setFont("helvetica", "bold");
        doc.text("Educational Background", marginLeft, cursorY);
        cursorY += 6;
        doc.setFontSize(12);
        educationList.forEach(ed => {
            function addBoldLabel(label, value) {
                doc.setFont("helvetica", "bold");
                doc.text(`${label}: `, marginLeft, cursorY);
                let textWidth = doc.getTextWidth(`${label}: `);
                doc.setFont("helvetica", "normal");
                doc.text(value, marginLeft + textWidth, cursorY);
                cursorY += 6;
            }
            addBoldLabel("Institution", ed.institution);
            addBoldLabel("Course", ed.course);
            addBoldLabel("Years", `${ed.startYear} - ${ed.endYear}`);
            cursorY += 2; // Small gap between entries
            doc.setLineWidth(0.5);
            doc.line(marginLeft, cursorY, doc.internal.pageSize.width - marginLeft, cursorY);
            cursorY += 10;
        });

        // Character Reference
        doc.setFontSize(14).setFont("helvetica", "bold");
        doc.text("Character Reference", marginLeft, cursorY);
        cursorY += 6;
        doc.setFontSize(12);
        function addBoldLabel(label, value) {
            doc.setFont("helvetica", "bold");
            doc.text(`${label}: `, marginLeft, cursorY);
            let textWidth = doc.getTextWidth(`${label}: `);
            doc.setFont("helvetica", "normal");
            doc.text(value, marginLeft + textWidth, cursorY);
            cursorY += 6;
        }

        addBoldLabel("Name", crefName);
        addBoldLabel("Position", crefPosition);
        addBoldLabel("Location", crefLocation);
        addBoldLabel("Phone", crefNumber);
        cursorY += 10;

        // Save PDF
        doc.save("resume.pdf");
    });
});