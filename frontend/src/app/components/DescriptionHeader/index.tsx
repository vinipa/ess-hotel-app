import { DescriptionTitleText, Row } from '../../utils/utils';

interface DescriptionHeaderProps {
    title: string;
    description: object;
}

function DescriptionHeader({ title, description }: DescriptionHeaderProps) {
    return (
        <Row>
            <DescriptionTitleText>{title}</DescriptionTitleText>
            <>{description}</>
        </Row>
    );
}

export default DescriptionHeader;