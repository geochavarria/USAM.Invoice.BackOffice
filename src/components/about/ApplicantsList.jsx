

import fesvLogo from "@/assets/images/resource/bg-fesv.png"
import logoLight from "@/assets/images/logo-light.png"
import emailLogo from "@/assets/images/resource/email-1.png"

const ApplicantsList = () => {
    const applicantsContent = [
      {
        id: 1,
        avatar: fesvLogo,
        name: "Consulta Pública",
        designation: "Ministerio de Hacienda",
      },
      {
        id: 2,
        avatar: logoLight,
        name: "Portal Usuario",
        designation: "USAM",
      },
      {
        id: 3,
        avatar: emailLogo,
        name: "E-Mail",
        designation: "Notificación",
      },
    ];
  return (
    <>
      {applicantsContent.map((applicants) => (
        <li className="applicant mb-1" key={applicants.id}>
          <figure className="image m-0">
            <img src={applicants.avatar} alt="resource" />
          </figure>
          <h4 className="name py-0">{applicants.name}</h4>
          <span className="designation">{applicants.designation}</span>
        </li>
      ))}
    </>
  );
};

export default ApplicantsList;
