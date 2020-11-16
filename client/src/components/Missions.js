import { gql, useQuery } from "@apollo/client";

const GET_MISSIONS = gql`
  query GetMissions {
    missions {
      id
      designation
      crew {
        id
        name
      }
    }
  }
`;

function Missions() {
  const { data, error, loading } = useQuery(GET_MISSIONS);

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Oops... {error.message}</div>;
  } else if (data) {
    return (
      <>
        <h1 className="font-semibold text-3xl mb-4">Apollo Missions</h1>
        <ul className="text-center">
          {data.missions.map(mission => (
            <li key={mission.id} className="mb-4">
              <h2 className="font-semibold text-xl mb-2">
                {mission.designation}
              </h2>
              <div>
                {mission.crew?.length ? (
                  mission.crew.map(({ id, name }) => (
                    <span key={id} className="mx-2">
                      {name}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">This flight was uncrewed</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Missions;
