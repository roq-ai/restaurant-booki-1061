// in src/components/AdminApp.jsx
'use client'; // only needed if you choose App Router
import {
  Admin,
  Resource,
  List,
  Datagrid,
  EditGuesser,
  DataProvider,
  GetListParams,
  ShowGuesser,
  Create,
  required,
  SimpleForm,
  GetOneParams,
  TextInput,
  BooleanInput,
  NumberInput,
  ReferenceInput,
  DateTimeInput,
  SelectInput,
  GetManyParams,
  CreateParams,
  Edit,
  UpdateParams,
  TextField,
  NumberField,
  BooleanField,
  ReferenceField,
  DateField,
  SimpleShowLayout,
  Show,
  ListGuesser,
} from 'react-admin';
import { fetcher, makeUrl, marshal } from '@roq/client';
import { Box } from '@chakra-ui/react';

const baseOptions = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwNjhiMjQ0LThjZWMtNGVkNi04N2Q3LTM3YWM2ZDg5OWY4ZiIsInJvcVVzZXJJZCI6IjliOWJhMTA5LWQ0ZTktNGMzZS04NDBkLTE0NDBmNTRiNzg2YSIsInJvcUFjY2Vzc1Rva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnliM0ZGYm5acGNtOXViV1Z1ZEVsa0lqb2lOVGhoT1RnNFpUY3RZVE15TkMwME4yWTRMVGxqTXpNdFl6aGxaR0U1Tkdaa05tUXdJaXdpY205eFZYTmxja2xrSWpvaU9XSTVZbUV4TURrdFpEUmxPUzAwWXpObExUZzBNR1F0TVRRME1HWTFOR0kzT0RaaElpd2ljbTlzWlhNaU9sc2ljbVZ6ZEdGMWNtRnVkQzF2ZDI1bGNpSmRMQ0p1YjNScFptbGpZWFJwYjI1VWIydGxiaUk2SWpWallXVXdNMkl3WkRBMlpqUTJPV0pqWWpJeVl6ZGtaakJqTmpjNE1HWXpOVGxtTjJSaFpqTmlOakZtT0RaaE5UazNZMlppTlRrd01EVXhPRGt5WlRnME5UQTBPVEZrTm1NNFltTmtOamt5T1RsaU9UTTBOV1E1TmpobVpEVXdZbVZqTmpSaU0yRTBaREZoWmpRNE5EUTNNek5rWW1RM09XUTFaREl3WkdNNU5EQTNNV1JqTW1GbU5UQmhOVGMyTmpCaE1qRmpOVGsyTURjMU1EZzNaRFZrWldaa05HVmxZV1kzTVdVeE9XTTJZVFZqTURsaVl6WmxPRFl5WVdJNU5HWXpOalpoT0RObFpETXlOemM0WVRaak1Ua3paVFk1TUdNM05qSTRPR1V4TXpOa09ETTBZV1ZoWkRCa04yRXlNRE5tTTJRMU5XTXpOV1EyTnpoak16YzBNRFV5T0dKa1kyRXdZMkl3TVRBell6a3hPVEk1T1dJMVlqazFZamN3WmpNell6YzVNRFkxTm1NMk1HSTJNV0kyWW1FeFkySmtZbVJpTURjek1HVTNaalE0TmpjNVpEVTBPV0U0WTJJelptUmlabU5qWmpKaFpHRmhOV0ZtT0dSbE1Ua3labVF5WkROaE1qWTVOakF5WmpjMk5qRTRNakl6WWpsa05HUTRZVFF3WlRjMFlqQTFNRGc1WXpCbU1qUmlZV1V3WTJNek56aGlNMlUwWkRJNVpHTXlORGRtWXpCaU16Y3lNMkl6TkRKaE9UQmtaVEV3WTJZMU5HWmhOamcxTVRBellUQmhOakF4WldNMlpqTTJNV0ppWldNd1l6YzRPVFptTVdSaFl6QXdOemd6T1ROak9UaGtNakV5TVdZMk9UUTNaV1l3TkRjMU1EVTBOV05rT0dFNU5HRXhNV1l5WlRFNVptVTBNemRoTURBMFpqUm1ZVGs0TlRjM01qbGlZMlZqTjJFNVlqTXdNV1V3WXpZME1XSm1Zall4Wm1RNU5EazJNV1F4TWpBeFlXUXpOVGcwT1RrME16QmhPR0ZtTldRM1l6UmlNMll5T0dJME56aG1aRGszWVdZeU1EWTBObU01T1RSa1lUTmpNVEV6TldJM01XWXlZVFV6Tm1JMk5HRTBNekJsTkRrd1pXTTROR00zTURJNE1HSTBORE5pWlRsbU16Qmpaamt4WWpreE5UUTJOakZqWkRjM1lUSmxaVEF6TldOaFpUTXhPREUzWlRaaU1tTTJaak00TjJSaFlXVTJOMlkyWVRsbE0yRTJOek14TldFek9EVmlOalF4TURkaU5HSmlPR0kwT0dRd01UQXlNMlV5WXprME5HRTJNVGswWkRKbE1UaGtPV0kwTUdJeU5qRmhaV0k0TmpZek9HRmxZamcwWVdNd05qSTVaV1kzWTJaa01HUTVPVEZpTnpSa1ptVTFOVFJrTVdNMU1EWmlNalUzWldWbU1HSTNORFJqT1dObE56UmhabVV4TTJRME1XWXhPR1pqTldJM01EQTRZell6T1RSbE5qWTNaVEpsWlRSbU1ESmpZak0zTkRneE1EQTNNMkl3TkRObU5HWXdOVFkzTm1JM1lUWmpZakJtTkdZMU5EWTBOalptTURoak16RTJNbVF4Tm1KaFpUY3pNamhsTXpGaE5qUmxPREV3TXprNE9XVXlZMkV3TkdaaU1UQmlaSHcwTm1VNVlqYzBNamd4WlRJMU5HSmpaR1F4WkRjeE5ERmpZVEkwWlRkaVlpSXNJblJsYm1GdWRFbGtJam9pTjJJeU16TTBaR010TlRoak5TMDBaV0psTFdFM1pUQXROekk1WkRNd1pUZ3pNR0V5SWl3aWFXRjBJam94TmprNE9EUTJNalV5TENKbGVIQWlPakUyT1RnNU16STJOVEo5LkJNOU5IeE43emtpYjdKSS1MUUVsUlVhak14NGJPdkphaHJUX3A2eVlObFUiLCJyb3FJZFRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnliM0ZGYm5acGNtOXViV1Z1ZEVsa0lqb2lOVGhoT1RnNFpUY3RZVE15TkMwME4yWTRMVGxqTXpNdFl6aGxaR0U1Tkdaa05tUXdJaXdpY205eFZYTmxja2xrSWpvaU9XSTVZbUV4TURrdFpEUmxPUzAwWXpObExUZzBNR1F0TVRRME1HWTFOR0kzT0RaaElpd2ljbTlzWlhNaU9sc2ljbVZ6ZEdGMWNtRnVkQzF2ZDI1bGNpSmRMQ0ptYVhKemRFNWhiV1VpT2lJaUxDSnNZWE4wVG1GdFpTSTZJaUlzSW1WdFlXbHNJam9pYm1scmIyeGhlUzV6WVhacGJrQnliM0V1ZEdWamFDSXNJblJsYm1GdWRFbGtJam9pTjJJeU16TTBaR010TlRoak5TMDBaV0psTFdFM1pUQXROekk1WkRNd1pUZ3pNR0V5SWl3aWJHOWpZV3hsSWpvaVpXNHRWVk1pTENKMGFXMWxlbTl1WlNJNklrVjFjbTl3WlM5Q1pYSnNhVzRpTENKcFlYUWlPakUyT1RnNE5EWXlOVElzSW1WNGNDSTZNVFk1T0Rrek1qWTFNbjAuY0s3aFNZRVJQbHNHOU5HWHJfNXVDdElIMEM2eFVwVzhXRlhPQVRWYnMtTSIsInJvcVJlZnJlc2hUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWkNJNkltWTJZMkZpWVdJM0xUa3dOREF0TkRVMVpTMWhZelUzTFRNMVlUbG1NR1UyT0RNMk1pSXNJbVZ1ZG1seWIyNXRaVzUwU1dRaU9pSTFPR0U1T0RobE55MWhNekkwTFRRM1pqZ3RPV016TXkxak9HVmtZVGswWm1RMlpEQWlMQ0pwWVhRaU9qRTJPVGc0TkRZeU5URXNJbVY0Y0NJNk1UWTVPRGt6TWpZMU1YMC5WeUJVU2lwaVNKNG1yWW5aLWdaYVB4NnYyN3FTaHh4MkQwOTJNbzNfLW9ZIiwiaWF0IjoxNjk4ODQ2MjUyLCJleHAiOjE2OTg5MzI2NTJ9.hdHnQhl_yEZoHGrjqDcRsnHVlaXSDhxqUXmy89VgP98'};

const baseUrl = 'https://restaurant-booki-1061-baas-dev-d66apvpi3q-ey.a.run.app/api/model';

function convertGetListParamsToPrismaQuery(getListParams: GetListParams) {
  const { pagination, sort, filter } = getListParams;

  const prismaQuery = {
    take: pagination.perPage,
    skip: (pagination.page - 1) * pagination.perPage,
    orderBy: {
      [sort.field]: sort.order.toLowerCase(),
    },
    where: filter,
  };

  return prismaQuery;
}

function convertGetOneParamsToPrismaQuery(getOneParams: GetOneParams) {
  const { id } = getOneParams;

  const prismaQuery = {
    where: {
      id,
    },
  };

  return prismaQuery;
}

function convertGetManyParamsToPrismaQuery(getManyParams: GetManyParams) {
  const { ids } = getManyParams;

  const prismaQuery = {
    where: {
      id: { in: ids },
    },
  };

  return prismaQuery;
}

function convertCreateParamsToPrismaQuery(createParams: CreateParams) {
  const { data } = createParams;

  const prismaQuery = {
    data,
  };

  return prismaQuery;
}

function convertUpdateParamsToPrismaQuery(updateParams: UpdateParams) {
  const { data, id } = updateParams;

  const prismaQuery = {
    where: { id },
    data,
  };

  return prismaQuery;
}

interface FieldInterface {
  field: string;
  type: 'boolean' | 'string' | 'number' | 'timestamp';
  required: boolean;
  relation?: { entity: string; showField: string };
}
interface EntityInterface {
  fields: FieldInterface[];
}

const FormGuesser = (props: EntityInterface) => {
  return (
    <SimpleForm>
      {props.fields.map((field) => {
        const validate = [];
        if (field.required) {
          validate.push(required());
        }
        if (field.relation) {
          return (
            <ReferenceInput
              reference={field.relation.entity}
              key={field.field}
              source={field.field}
              validate={validate}
            >
              <SelectInput />
            </ReferenceInput>
          );
        }
        if (field.type === 'timestamp') {
          return <DateTimeInput key={field.field} source={field.field} validate={validate} />;
        }
        if (field.type === 'string') {
          return <TextInput key={field.field} source={field.field} validate={validate} />;
        }
        if (field.type === 'number') {
          return <NumberInput key={field.field} source={field.field} validate={validate} />;
        }
        if (field.type === 'boolean') {
          return <BooleanInput key={field.field} source={field.field} validate={validate} />;
        }
      })}
    </SimpleForm>
  );
};

const ListGrid = (props: EntityInterface) => {
  return (
    <List>
      <Datagrid rowClick="edit">
        {props.fields.map((field, i) => {
          if (field.relation) {
            return <ReferenceField reference={field.relation.entity} key={field.field} source={field.field} />;
          }
          if (field.type === 'timestamp') {
            return <DateField key={field.field} source={field.field} />;
          }
          if (field.type === 'string') {
            return <TextField key={field.field} source={field.field} />;
          }
          if (field.type === 'number') {
            return <NumberField key={field.field} source={field.field} />;
          }
          if (field.type === 'boolean') {
            return <BooleanField key={field.field} source={field.field} />;
          }
        })}
      </Datagrid>
    </List>
  );
};

const CreateForm = (props: EntityInterface) => {
  return (
    <Create>
      <FormGuesser {...props} />
    </Create>
  );
};

const EditForm = (props: EntityInterface) => {
  return (
    <Edit>
      <FormGuesser {...props} />
    </Edit>
  );
};

const dataProvider: DataProvider = {
  getList: async (resource: string, params) => {
    const args = convertGetListParamsToPrismaQuery(params);
    const url = `${baseUrl}/${resource}/findMany`;
    const urlWithArgs = makeUrl(url, args);
    const response = await fetcher(
      urlWithArgs,
      {
        method: 'GET',
        headers: { ...baseOptions, 'content-type': 'application/json' },
      },
      fetch,
      false,
    );
    const countUrl = `${baseUrl}/${resource}/count`;
    const countUrlWithArgs = makeUrl(countUrl, args);
    const responseCount = await fetcher(
      countUrlWithArgs,
      {
        method: 'GET',
        headers: {
          ...baseOptions,
          'content-type': 'application/json',
        },
      },
      fetch,
      false,
    );
    return {
      data: response as any,
      total: responseCount as any,
    };
  },

  // get a single record by id
  getOne: async (resource, params) => {
    const args = convertGetOneParamsToPrismaQuery(params);
    const url = `${baseUrl}/${resource}/findFirst`;
    const urlWithArgs = makeUrl(url, args);
    const response = await fetcher(
      urlWithArgs,
      {
        method: 'GET',
        headers: {
          ...baseOptions,
          'content-type': 'application/json',
        },
      },
      fetch,
      false,
    );
    return { data: response as any };
  },
  // get a list of records based on an array of ids
  getMany: async (resource, params) => {
    const args = convertGetManyParamsToPrismaQuery(params);
    const url = `${baseUrl}/${resource}/findMany`;
    const urlWithArgs = makeUrl(url, args);
    const response = await fetcher(
      urlWithArgs,
      {
        method: 'GET',
        headers: {
          ...baseOptions,
          'content-type': 'application/json',
        },
      },
      fetch,
      false,
    );

    return {
      data: response as any,
    };
  },
  // get the records referenced to another record, e.g. comments for a post
  getManyReference: async (resource, params) => {
    const args = convertGetListParamsToPrismaQuery(params);
    const url = `${baseUrl}/${resource}/findMany`;
    const urlWithArgs = makeUrl(url, args);
    const response = await fetcher(
      urlWithArgs,
      {
        method: 'GET',
        headers: {
          ...baseOptions,
          'content-type': 'application/json',
        },
      },
      fetch,
      false,
    );

    return {
      data: response as any,
    };
  },
  // create a record
  create: async (resource, params) => {
    const data = convertCreateParamsToPrismaQuery(params);
    const url = `${baseUrl}/${resource}/create`;
    const response = await fetcher(
      url,
      {
        method: 'POST',
        headers: {
          ...baseOptions,
          'content-type': 'application/json',
        },
        body: marshal(data),
      },
      fetch,
      true,
    );

    return {
      data: response as any,
    };
  },
  // update a record based on a patch
  update: async (resource, params) => {
    const data = convertUpdateParamsToPrismaQuery(params);
    const url = `${baseUrl}/${resource}/update`;
    const response = await fetcher(
      url,
      {
        method: 'PUT',
        headers: {
          ...baseOptions,
          'content-type': 'application/json',
        },
        body: marshal(data),
      },
      fetch,
      true,
    );

    return {
      data: response as any,
    };
  },
  // update a list of records based on an array of ids and a common patch
  updateMany: async (resource, params) => {
    const args = params;
    const url = `${baseUrl}/${resource}/updateMany`;
    const urlWithArgs = makeUrl(url, args);
    const response = await fetcher(
      urlWithArgs,
      {
        method: 'PUT',
        headers: {
          ...baseOptions,
          'content-type': 'application/json',
        },
      },
      fetch,
      true,
    );

    return {
      data: response as any,
    };
  },
  // delete a record by id
  delete: async (resource, params) => {
    const args = params;
    const url = `${baseUrl}/${resource}/delete`;
    const urlWithArgs = makeUrl(url, args);
    const response = await fetcher(
      urlWithArgs,
      {
        method: 'DELETE',
        headers: {
          ...baseOptions,
          'content-type': 'application/json',
        },
      },
      fetch,
      true,
    );

    return {
      data: response as any,
    };
  },
  // delete a list of records based on an array of ids
  deleteMany: async (resource, params) => {
    const args = params;
    const url = `${baseUrl}/${resource}/deleteMany`;
    const urlWithArgs = makeUrl(url, args);
    const response = await fetcher(
      urlWithArgs,
      {
        method: 'DELETE',
        headers: {
          ...baseOptions,
          'content-type': 'application/json',
        },
      },
      fetch,
      true,
    );

    return {
      data: response as any,
    };
  },
};

const AdminApp = () => {
  const schema = {
    entities: [
      {
        entity: 'user',
        recordRepresentation: 'email',
        fields: [
          { field: 'email', type: 'string', required: true },
          { field: 'first_name', type: 'string', required: true },
          { field: 'last_name', type: 'string', required: true },
        ],
      },
      {
        entity: 'employee',
        recordRepresentation: 'job_title',
        fields: [
          { field: 'user_id', type: 'string', required: true, relation: { entity: 'user', showField: 'email' } },
          {
            field: 'restaurant_id',
            type: 'string',
            required: true,
            relation: { entity: 'restaurant', showField: 'name' },
          },
          { field: 'job_title', type: 'string', required: true },
          { field: 'salary', type: 'number', required: true },
          { field: 'hire_date', type: 'timestamp', required: true },
        ],
      },
    ],
  };

  return (
    <Box display="block" overflowY="scroll" overflowX="scroll">
      <Admin dataProvider={dataProvider}>
        {schema.entities.map((entity) => {
          return (
            <Resource
              key={entity.entity}
              name={entity.entity}
              list={() => <ListGrid fields={entity.fields as FieldInterface[]} />}
              edit={() => <EditForm fields={entity.fields as FieldInterface[]} />}
              create={() => <CreateForm fields={entity.fields as FieldInterface[]} />}
              recordRepresentation={entity.recordRepresentation}
            />
          );
        })}
        <Resource name="menu" edit={EditGuesser} show={ShowGuesser} />
        <Resource name="reservation" edit={EditGuesser} show={ShowGuesser} />
        <Resource recordRepresentation="name" name="restaurant" edit={EditGuesser} show={ShowGuesser} />
      </Admin>
    </Box>
  );
};

export default AdminApp;
