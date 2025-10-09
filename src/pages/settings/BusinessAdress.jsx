import BusinessAdressModal from "../../components/BusinessAddressModal";
import Modal from "../../components/Modal";
import { Icon, Table, Td, Th, Thead } from "../../components/Component";
import { useState } from "react";
import { useBusinessAddress } from "../../hooks/useSettings"; // Import the fetch hook
import Loading from "../../components/Loading";

function BusinessAdress() {
  // State to control the modal visibility
  const [businessModal, setBusinessModal] = useState(false);

  // 1. Fetch the single Business Address data
  const { data: addressData, isLoading } = useBusinessAddress();

  // 2. Prepare the data for the table (as an array with 0 or 1 item)
  const adresses = addressData ? [addressData] : [];

  if (isLoading) {
    return <Loading />;
  }

  const address = adresses[0];
  return (
    <>
      {adresses.length === 0 && (
        <div className="p-4 text-text2">
          No business address found.
          <button
            onClick={() => {
              setBusinessModal(true);
              console.log("button clicked");
            }}
            className="text-brand underline ml-1 cursor-pointer"
          >
            Click here to add one.
          </button>
        </div>
      )}

      {adresses.length !== 0 && (
        <Table>
          <Thead>
            <tr className="text-left">
              <Th title="Country" />
              <Th title="Address" />
              <Th title="Tax Name" />
              <Th title="Latitude" />
              <Th title="Location" />
              <Th title="Longitude" />
              <Th title="Action" />
            </tr>
          </Thead>
          <tbody>
            {/* Map over the single entry */}
            <tr
              key={address._id} // Use the unique ID from the API
              className="h-16 hover:[&_td]:bg-divider/80 text-text2 transition-colors"
            >
              {/* Client Name with Avatar */}
              <Td className="first:rounded-l-[4px]">{address.country}</Td>
              <Td className="text-left">{address.address}</Td>
              <Td className="text-left">{address.taxName}</Td>
              {/* Safely display latitude and longitude */}
              <Td className="text-left">{address.latitude ?? "N/A"}</Td>
              <Td className="text-left">{address.location}</Td>
              <Td className="text-left">{address.longitude ?? "N/A"}</Td>

              {/* Action Button: opens the modal to edit this single entry */}
              <Td className="text-left last:rounded-r-[4px]">
                <button
                  onClick={() => setBusinessModal(true)}
                  className="p-2 rounded-full cursor-pointer hover:bg-surface2/60"
                >
                  <Icon name="menu" size={20} />
                </button>
              </Td>
            </tr>
          </tbody>
        </Table>
      )}

      {/* Modal is still controlled by the state */}
      <Modal isOpen={businessModal} onClose={() => setBusinessModal(false)}>
        <BusinessAdressModal
          address={address}
          onClose={() => setBusinessModal(false)}
        />
      </Modal>
    </>
  );
}

export default BusinessAdress;
