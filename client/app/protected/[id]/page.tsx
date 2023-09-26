'use client';
// This file has been sourced from: /Users/macbook/Desktop/Desktop-MacBook/Pinely/kutt/client/pages/protected/[id].tsx
import { useParams, useSearchParams } from "next/navigation";
import { useFormState } from "react-use-form-state";
import { Flex } from "rebass/styled-components";
import { NextPage } from "next";
import axios from "axios";
import { useState, useCallback } from "react";

import AppWrapper from "../../../components/AppWrapper";
import { TextInput } from "../../../components/Input";
import { Button } from "../../../components/Button";
import Text, { H2 } from "../../../components/Text";
import { Col } from "../../../components/Layout";
import Icon from "../../../components/Icon";
import { APIv2 } from "../../../consts";
import Components from "./components";

// interface Props {
//   protectedLink?: string;
// }

const ProtectedPage: any = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const getParam = useCallback((p: string) => params?.[p] ?? searchParams?.get(p), [params, searchParams]);
  const [loading, setLoading] = useState(false);
  const [formState, { password }] = useFormState<{ password: string }>();
  const [error, setError] = useState<string>();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { password } = formState.values;

    if (!password) {
      return setError("Password must not be empty.");
    }

    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${APIv2.Links}/${getParam("id")}/protected`,
        {
          password
        }
      );
      window.location.replace(data.target);
    } catch ({ response }) {
      setError(response.data.error);
    }
    setLoading(false);
  };

  return (
    <AppWrapper>
      {!getParam("id") ? (
        <H2 my={4} light>
          404 | Link could not be found.
        </H2>
      ) : (
        <Col width={500} maxWidth="97%">
          <H2 my={3} bold>
            Protected link
          </H2>
          <Text mb={4}>Enter the password to be redirected to the link.</Text>
          <Flex
            as="form"
            alignItems="center"
            onSubmit={onSubmit}
            style={{ position: "relative" }}
          >
            <TextInput
              {...password("password")}
              placeholder="Password"
              autocomplete="off"
              height={[44, 54]}
              width={[1, 1 / 2]}
              mr={3}
              autoFocus
              required
            />
            <Button type="submit" height={[40, 44]}>
              {loading && <Icon name={"spinner"} stroke="white" mr={2} />}
              Go
            </Button>
          </Flex>
          <Text fontSize={14} color="red" mt={3} normal>
            {error}
          </Text>
        </Col>
      )}
    </AppWrapper>
  );
};

ProtectedPage.getInitialProps = async ({ req }) => {
  return {
    protectedLink: req && (req as any).protectedLink
  };
};

export default ProtectedPage;

// export default async function Page(props: any) {
// 			return <Components {...props} />;
// 		}
