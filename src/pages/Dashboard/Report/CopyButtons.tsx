import AssignmentIcon from '@mui/icons-material/Assignment';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import { IconButton, styled } from '@mui/material';
import { useState } from 'react';
import ValidationTooltip from '../../../components/ValidationTooltip/ValidationTooltip';
import { ExporterFactory } from '../../../services/Exporter/ExporterFactory';
import { ExportType } from '../../../services/Exporter/ExportType';
import { Project } from '../../../types/Project';
import { ReportData } from '../../../types/ReportData';

const FixedCopyContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: 25,
  right: 35,
  display: 'flex',
  background: '#071115',
  borderRadius: '10px',
  padding: '6px 10px',
  border: '1px solid #00C2FF11',
}));

const CopyButton = styled(IconButton)(() => ({
  color: "#9AE7FF",
}));

function CopyButtons({ reportData }: { reportData: ReportData }) {
  const [isExported, setIsExported] = useState(false);

  const getFilteredReportData = (): ReportData => {
    const newReportData: ReportData = { ...reportData, projects: new Map() };

    reportData.projects.forEach((v: Project, k: string) => {
      if (v.options.shown)
        newReportData.projects.set(k, v);
    })

    return newReportData;
  }

  const exportAs = (as: ExportType) => {
    (ExporterFactory.generate(as).export(getFilteredReportData()))
    setIsExported(true);
  }

  return (
    <FixedCopyContainer>
      <ValidationTooltip isValidated={isExported} setIsValidated={setIsExported} validatedTitle="Copied" notValidatedTitle="Copy to Text">
        <CopyButton size="large" onClick={() => exportAs(ExportType.Text)}>
          <AssignmentIcon />
        </CopyButton>
      </ValidationTooltip>
      <ValidationTooltip isValidated={isExported} setIsValidated={setIsExported} validatedTitle="Copied" notValidatedTitle="Copy to Html">
        <CopyButton size="large" onClick={() => exportAs(ExportType.Html)}>
          <IntegrationInstructionsIcon />
        </CopyButton>
      </ValidationTooltip>
    </FixedCopyContainer>
  );
}

export default CopyButtons;
