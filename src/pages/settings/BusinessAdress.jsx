import BusinessAdressModal from "../../components/BusinessAddressModal";
import Modal from "../../components/Modal";
import { Icon, Table, Td, Th, Thead } from "../../components/Component";
import { useState } from "react";

function BusinessAdress() {
  const [BusinessModal, SetBusinessModal] = useState(false);
  const adresses = [
    {
      country: "USA",
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      taxName: "VAT",
      latitude: 38.895,
      location: "San Jose",
      longitude: -77.80548,
    },
  ];
  return (
    <>
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
          {adresses.map((address, index) => (
            <tr
              key={index}
              className="h-16 hover:[&_td]:bg-divider/80 text-text2 transition-colors"
            >
              {/* Client Name with Avatar */}
              <Td className="first:rounded-l-[4px]">{address.country}</Td>
              <Td className="text-left">{address.address}</Td>
              <Td className="text-left">{address.taxName}</Td>
              <Td className="text-left">{address.latitude}</Td>
              <Td className="text-left">{address.location}</Td>
              <Td className="text-left">{address.longitude}</Td>
              {/* Action Button */}
              <Td className="text-left last:rounded-r-[4px]">
                <button
                  onClick={() => SetBusinessModal(true)}
                  className="p-2 rounded-full cursor-pointer hover:bg-surface2/60"
                >
                  <Icon name="menu" size={20} />
                </button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        isOpen={BusinessModal}
        onClose={() => SetBusinessModal(false)}
      >
        <BusinessAdressModal onClose={() => SetBusinessModal(false)} />
      </Modal>
    </>
  );
}

export default BusinessAdress;
