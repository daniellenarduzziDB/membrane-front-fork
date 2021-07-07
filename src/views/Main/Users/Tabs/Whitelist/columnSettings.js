import _ from 'lodash';
import Switch from  '../../../../../components/Switch';

const getColumnSettings = (onChangeStatus) => {
  return [
    {
      key: 'name',
      label: 'NAME',
      cellTemplate: cellData => {
        let firstName = _.get(cellData, `target.firstName`, '');
        let lastName = _.get(cellData, `target.lastName`, '');
        return `${firstName} ${lastName}`;
      }
    },
    {
      key: 'email',
      label: 'E-MAIL',
      cellTemplate: cellData => {
        return _.get(cellData, `target.emailAddress`, '').trim();
      }
    },
    {
      key: 'company',
      label: 'COMPANY',
      field: 'target.company'
    },
    {
      key: 'status',
      label: 'STATUS',
      cellTemplate: cellData => {
        const targetStatus = _.get(cellData, `target.status`, '');
        let status = cellData.status;
        if (targetStatus === 'not-available') status = targetStatus.replace('-', ' ');
        return status;
      }
    },
    {
      key: 'allowed',
      label: 'AVAILABLE TO TRADE WITH',
      cellTemplate: cellData => {
        const allowed = cellData.status === 'active';
        return (
          <Switch 
            isChecked={allowed} 
            onChange={(allowed) => onChangeStatus(cellData.id, allowed)}
          />
        );
      }
    }
  ];
} 

export default getColumnSettings;
